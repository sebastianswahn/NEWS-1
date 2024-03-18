

export const ScoreModal = ({
  totalScore,
  hideModal,
  warning,
  hasThreePoints,
  name,
  setName,
}) => {
  const saveScore = () => {
    const timestamp = new Date();

    let scores = JSON.parse(localStorage.getItem(name)) || [];

    scores.push({ name, totalScore, timestamp: timestamp.toString() });

    localStorage.setItem(name, JSON.stringify(scores));

    hideModal();
  };

  let bgColorClass = "bg-emerald-500";
  let scoreAdvice = "";

  if (hasThreePoints && totalScore <= 4) {
    bgColorClass = "bg-yellow-300";
    scoreAdvice = "Urgent department based measures";
  } else if (totalScore <= 4) {
    bgColorClass = "bg-slate-400";
    scoreAdvice = "Department based actions";
  } else if (totalScore >= 5 && totalScore <= 6) {
    bgColorClass = "bg-orange-500";
    scoreAdvice =
      "Urgent measures - Urgent evaluation from the responsible doctor with emergency care team ";
  } else if (totalScore >= 7) {
    bgColorClass = "bg-red-500";
    scoreAdvice =
      "Immediate evaluation by responsible doctor with ICU or anesthesiology team- prepare patient for transfer to ICU";
  }
  return (
    <div
      className={`flex flex-col justify-center items-center text-center absolute rounded-lg opacity-90 z-20 h-2/6 w-4/6 p-4 ${bgColorClass} left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="mb-4">{totalScore}</div>
      <div className="mb-4">{scoreAdvice}</div>
      {warning && <p className="text-red-500 py-2">{warning}</p>}
      <div className="flex">
        <button
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded opacity-90 mx-2"
          onClick={(event) => {
            event.preventDefault();
            hideModal();
          }}
        >
          Close
        </button>
        <button
          type="button"
          onClick={saveScore}
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
};
