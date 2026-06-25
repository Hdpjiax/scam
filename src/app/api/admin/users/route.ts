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

    const profilesById = new Map((profiles || []).map((p: any) => [p.id, p]));
    const authUsers = users || [];

    const mergedUsers = authUsers.map((u: any) => {
      const profile = profilesById.get(u.id) || {};
      return {
        id: u.id,
        name: profile.name || u.user_metadata?.name || u.email || "",
        email: profile.email || u.email || "",
        phone: profile.phone || u.user_metadata?.phone || u.phone || "",
        role: profile.role || "customer",
        created_at: profile.created_at || u.user_metadata?.created_at || "",
        ...profile,
      };
    });

    const missingProfiles = (profiles || []).filter((p: any) => !authUsers.some((u: any) => u.id === p.id));
    const extraProfiles = missingProfiles.map((p: any) => ({
      ...p,
      phone: p.phone || "",
    }));

    const usersList = [...mergedUsers, ...extraProfiles];

    return NextResponse.json({ users: usersList });
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
