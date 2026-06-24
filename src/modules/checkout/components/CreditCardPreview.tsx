type CardPreviewState = {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
};

export function CreditCardPreview({
  card,
  cardBrand,
  flipped,
}: {
  card: CardPreviewState;
  cardBrand: string;
  flipped: boolean;
}) {
  return (
    <div className="visual-card-container">
      <div className={`visual-card ${flipped ? "flipped" : ""}`}>
        <div className="visual-card-front">
          <div className="visual-card-row">
            <div className="visual-card-logo-symbol">
              NOMA<span>living spaces</span>
            </div>
            <div className="visual-card-brand-logo">{cardBrand}</div>
          </div>
          <div className="visual-card-chip" />
          <div className="visual-card-number">
            {card.number || "**** **** **** ****"}
          </div>
          <div className="visual-card-info-row">
            <div>
              <span className="visual-card-label">Cardholder</span>
              <div className="visual-card-value">
                {card.holder || "Cardholder Name"}
              </div>
            </div>
            <div>
              <span className="visual-card-label">Expires</span>
              <div className="visual-card-value">{card.expiry || "MM/YY"}</div>
            </div>
          </div>
        </div>

        <div className="visual-card-back">
          <div className="visual-card-back-magnetic" />
          <div className="visual-card-back-sig-area">
            <div className="visual-card-back-sig-line" />
            <div className="visual-card-back-cvv">{card.cvv || "***"}</div>
          </div>
          <div className="visual-card-row" style={{ marginTop: "auto", padding: "0 24px 20px" }}>
            <span className="visual-card-label" style={{ margin: 0 }}>
              Authorized Signature
            </span>
            <small style={{ fontSize: "8px", opacity: 0.6 }}>NOMA SECURE</small>
          </div>
        </div>
      </div>
    </div>
  );
}
