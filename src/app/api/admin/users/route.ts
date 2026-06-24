import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createAdminClient } from "../../../../lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const userSupabase = await createClient();
    const { data: { user } } = await userSupabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await userSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabaseAdmin = createAdminClient();

    // Fetch database profiles
    const { data: profiles, error: profilesErr } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesErr) throw profilesErr;

    // Fetch auth users
    const { data: { users }, error: authErr } = await supabaseAdmin.auth.admin.listUsers();
    if (authErr) throw authErr;

    // Zip profiles and auth user metadata
    const zippedUsers = (profiles || []).map((p: any) => {
      const authUser = users?.find((u) => u.id === p.id);
      return {
        ...p,
        phone: authUser?.user_metadata?.phone || authUser?.phone || "",
      };
    });

    return NextResponse.json({ users: zippedUsers });
  } catch (err: any) {
    console.error("GET users error:", err);
    return NextResponse.json({ error: err.message || "Failed to retrieve users." }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userSupabase = await createClient();
    const { data: { user } } = await userSupabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await userSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, name, email, phone, role, password } = body;

    if (!userId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    // 1. Update database profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ name, email, role })
      .eq("id", userId);

    if (profileError) throw profileError;

    // 2. Update auth schema
    const updateData: any = {
      email,
      user_metadata: { name, phone },
    };
    if (password) {
      updateData.password = password;
    }

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, updateData);
    if (authError) throw authError;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PUT users error:", err);
    return NextResponse.json({ error: err.message || "Failed to update user." }, { status: 400 });
  }
}
