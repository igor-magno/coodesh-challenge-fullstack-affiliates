import TransactionRepository from "../repositories/TransactionRepository.js";
import GetAllTransactionsService from "../services/GetAllTransactionsService.js";
import GetSumValueService from "../services/GetSumValueService.js";
import ImportTransactionsByTxtFileService from "../services/ImportTransactionsByTxtFileService.js";
import TransactionModel from "../models/Transaction.js";
import TypeRepository from "../repositories/TypeRepository.js";
import TypeModel from "../models/Type.js";
import lang from "../Internationalization/lang.js";
import maper from "../Internationalization/maper.js";

const routes = {
  "/transaction/txt-import:post": async (request, response) => {
    await new ImportTransactionsByTxtFileService({
      transactionRepository: new TransactionRepository({
        transactionModel: TransactionModel,
      }),
      typeRepository: new TypeRepository({ typeModel: TypeModel }),
    }).run(request, response);

    return response.end(
      lang({
        lang: request.headers["x-lang"],
        maperKey: maper["transaction.import.txt.success"],
      })
    );
  },
  "/transaction:get": async (request, response) => {
    const result = await new GetAllTransactionsService({
      transactionRepository: new TransactionRepository({
        transactionModel: TransactionModel,
      }),
    }).run();

    response.write(JSON.stringify(result));

    return response.end();
  },
  "/transaction/sum-value:get": async (request, response) => {
    const result = await new GetSumValueService({
      transactionRepository: new TransactionRepository({
        transactionModel: TransactionModel,
      }),
    }).run();

    return response.end(
      JSON.stringify({
        sumValue: result,
      })
    );
  },
};

export default {
  routes: routes,
};
