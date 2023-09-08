const TransactionsImportByTxtPage = ({ navigate }: { navigate: Function }) => {
  const importTxtFile = () => {
    const { files: fileElements } = document.getElementById(
      "input-txt-file"
    ) as HTMLInputElement;
    if (!fileElements?.length) return;
    const file = fileElements[0];

    const formData = new FormData();
    formData.append("txtFile", file);

    fetch("http://localhost:3001/transaction/txt-import", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((respose) => {
        alert(respose);
      })
      .catch((error) => {
        alert("Ops ocorreu um erro!");
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between p-4">
        <button
          onClick={() => navigate("/transactions")}
          className="bg-blue-500 hover:bg-blue-700 dark:text-white font-bold py-2 px-4 rounded-full"
        >
          Voltar a Lista de Transações
        </button>
      </div>
      <div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="input-txt-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">TXT</p>
            </div>
            <input
              id="input-txt-file"
              type="file"
              accept=".txt"
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-center items-center p-8">
          <button
            onClick={importTxtFile}
            className="bg-blue-500 hover:bg-blue-700 dark:text-white font-bold py-2 px-4 rounded-full"
          >
            Importar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsImportByTxtPage;
