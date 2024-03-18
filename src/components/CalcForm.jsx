import React, { useState } from "react";
import totalScoreCounter from "./scoreCounter";
import { ScoreModal } from "./scoreModal";

export const CalcForm = () => {
  const [RR, setRR] = useState("");
  const [RRError, setRRError] = useState("");
  const [SpO2, setSpO2] = useState("");
  const [SpO2Error, setSpO2Error] = useState("");
  const [administeredOxygen, setAdministeredOxygen] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [systolicBPError, setsystolicBPError] = useState("");
  const [HR, setHR] = useState("");
  const [HRError, setHRError] = useState("");
  const [avpu, setAvpu] = useState("");
  const [temp, setTemp] = useState("");
  const [tempError, setTempError] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [showScoreModal, setshowScoreModal] = useState(false);
  const [warning, setWarning] = useState("");
  const [hasThreePoints, setHasThreePoints] = useState(false);
  const [name, setName] = useState("");
  const [SpO22, setSpO22] = useState("");
  const [SpO22Error, setSpO22Error] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (RR && (RR < 1 || RR > 100)) {
      setRRError("Please enter a number between 1-100");
      return;
    } else {
      setRRError("");
    }
    if (SpO2 && (SpO2 < 1 || SpO2 > 100)) {
      setSpO2Error("Please enter a % value between 1-100");
      return;
    } else {
      setSpO2Error("");
    }
    if (systolicBP && (systolicBP < 1 || systolicBP > 350)) {
      setsystolicBPError(
        "Please enter a valid millimeters of mercury systolic blood pressure value"
      );
      return;
    } else {
      setsystolicBPError("");
    }
    if (HR && (HR < 1 || HR > 350)) {
      setHRError("Please enter a valid heart rate");
      return;
    } else {
      setHRError("");
    }
    if (temp && (temp < 10 || temp > 50)) {
      setTempError("Please enter a valid temperature in celcius");
      return;
    } else {
      setTempError("");
    }
    if (SpO22 && (SpO22 < 1 || SpO22 > 100)) {
      setSpO2Error("Please enter a % value between 1-100");
      return;
    } else if (SpO22 && SpO2) {
      setSpO2Error("You can only fill either SpO2 or SpO2 2");
    } else if (SpO22) {
      setSpO2Error("");
      return;
    }
    let isFormIncomplete = false;

    /* change this if state to to not populate {warning} if one if them are set */

    if (
      !RR ||
      (!SpO2 && !SpO2) ||
      !systolicBP ||
      !HR ||
      !temp ||
      !administeredOxygen ||
      !avpu
    ) {
      isFormIncomplete = true;
    }

    if (isFormIncomplete) {
      setWarning("Result is inconclusive because not all values are set.");
    } else {
      setWarning("");
    }

    const { totalScore, hasThreePoints } = totalScoreCounter(
      Number(RR),
      Number(SpO2),
      Number(temp),
      Number(HR),
      Number(systolicBP),
      administeredOxygen,
      avpu,
      Number(SpO22)
    );
    setTotalScore(totalScore);
    setHasThreePoints(hasThreePoints);
    setshowScoreModal(true);
    console.log(totalScore, hasThreePoints);
  };

  const hideModal = () => {
    setshowScoreModal(false);
  };

  return (
    <div className="p-2 h-screen z-10">
      <form
        className="bg-slate-400 p-4 flex-row m-auto"
        onSubmit={handleSubmit}
      >
        {showScoreModal && (
          <ScoreModal
            totalScore={totalScore}
            hideModal={hideModal}
            warning={warning}
            hasThreePoints={hasThreePoints}
            name={name}
            setName={setName}
          />
        )}
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="name">
            Patient Room
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="RR">
            Respiratory Rate
          </label>
          <input
            type="number"
            id="RR"
            name="RR"
            value={RR}
            onChange={(e) => setRR(e.target.value)}
          />
          {RRError && <p className="text-red-500">{RRError}</p>}
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="SpO2">
            Saturation
          </label>
          <input
            type="number"
            id="SpO2"
            name="SpO2"
            value={SpO2}
            onChange={(e) => setSpO2(e.target.value)}
          />
          {SpO2Error && <p className="text-red-500">{SpO2Error}</p>}
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="SpO22">
            Saturation 2 on doctor's request
          </label>
          <input
            type="number"
            id="SpO22"
            name="SpO222"
            value={SpO22}
            onChange={(e) => setSpO22(e.target.value)}
          />
          {SpO22Error && <p className="text-red-500">{SpO22Error}</p>}
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="administeredOxygen">
            Distributed Oxygen
          </label>
          <select
            id="administeredOxygen"
            name="administeredOxygen"
            value={administeredOxygen}
            onChange={(e) => setAdministeredOxygen(e.target.value)}
          >
            <option></option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="systolicBP">
            Systolic Blood pressure
          </label>
          <input
            type="number"
            id="systolicBP"
            name="systolicBP"
            value={systolicBP}
            onChange={(e) => setSystolicBP(e.target.value)}
          />
          {systolicBPError && <p className="text-red-500">{systolicBPError}</p>}
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="HR">
            Heart Rate
          </label>
          <input
            type="number"
            id="HR"
            name="HR"
            value={HR}
            onChange={(e) => setHR(e.target.value)}
          />
          {HRError && <p className="text-red-500">{HRError}</p>}
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="avpu">
            AVPU
          </label>
          <select
            id="avpu"
            name="avpu"
            value={avpu}
            onChange={(e) => setAvpu(e.target.value)}
          >
            <option></option>
            <option value="A">A</option>
            <option value="C">C</option>
            <option value="V">V</option>
            <option value="P">P</option>
            <option value="U">U</option>
          </select>
        </div>
        <div className="flex flex-col p-4">
          <label className="pb-2" htmlFor="temp">
            Temperature
          </label>
          <input
            type="number"
            id="temp"
            name="temp"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          />
          {tempError && <p className="text-red-500">{tempError}</p>}
        </div>
        <div className="text-center items-center justify-center">
          <button
            className=" bg-blue-300 p-2 rounded-md m-auto w-1/2"
            type="submit"
          >
            Calculate Score
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalcForm;
