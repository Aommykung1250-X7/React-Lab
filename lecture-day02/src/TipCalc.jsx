import { useState } from "react";

function TipCalc() {
    const [billAmount, setBillAmount] = useState(0);
    const [tipPercent, setTipPercent] = useState(0);

    const tip = billAmount * (tipPercent / 100);

    return (
        <div className="p-5">
            <input type="number" className="border rounded border-slate-800 p-2" placeholder="bill amount" value={billAmount} onChange={(e) => {
                console.log("e >>", e);
                setBillAmount(Number(e.target.value));
            }} />

            <input type="number" className="border rounded border-slate-800 p-2" placeholder="tip percent" value={tipPercent} onChange={(e) => {
                setTipPercent(+e.target.value);
            }} />
            <br />
            {typeof billAmount} <br />
            {typeof tipPercent}
            <p>tip: {tip.toFixed(2)}</p>
        </div>
    )
}

export default TipCalc;