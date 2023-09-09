import lang from "../Internationalization/lang.js";
import maper from "../Internationalization/maper.js";
import TypeIsEmptyError from "../errors/TypeIsEmptyError.js";
import DateIsEmptyError from "../errors/DateIsEmptyError.js";
import ProductIsEmptyError from "../errors/ProductIsEmptyError.js";
import ValueIsEmptyError from "../errors/ValueIsEmptyError.js";
import SellerIsEmptyError from "../errors/SellerIsEmptyError.js";
import TypeIsInvalidError from "../errors/TypeIsInvalidError.js";
import DateIsInvalidError from "../errors/DateIsInvalidError.js";
import ValueIsInvalidError from "../errors/ValueIsInvalidError.js";
import formidable, { errors as formidableErrors } from "formidable";
import { readFileSync, unlinkSync } from "node:fs";

class ImportTransactionsByTxtFileService {
  constructor({ transactionRepository, typeRepository }) {
    this.transactionRepository = transactionRepository;
    this.typeRepository = typeRepository;
  }

  async run(request) {
    const form = formidable({});
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(request);
    } catch (err) {
      if (err.code === formidableErrors.maxFieldsExceeded) {
      }
      throw new Error(
        lang({
          language: request.headers["x-lang"],
          maperKey: maper["transaction.import.txt.error.zero.transactions"],
        })
      );
    }

    const buffer = readFileSync(files.txtFile[0].filepath);
    unlinkSync(files.txtFile[0].filepath);
    const linesArray = buffer.toString().split("\n");
    const transactions = [];
    const types = await this.typeRepository.all();
    const typesIds = types.map((t) => t.id);
    let typesIndexed = [];
    types.forEach((type) => {
      typesIndexed[type.id] = type;
    });

    for (let i = 0; i < linesArray.length; i++) {
      const line = linesArray[i];
      if (line.trimEnd().length > 0) {
        const type = line.slice(0, 1).trimEnd(); // 1
        const date = line.slice(1, 26).trimEnd(); // 25
        const product = line.slice(26, 56).trimEnd(); // 30
        const value = line.slice(56, 66).trimEnd(); // 10
        const seller = line.slice(66, 86).trimEnd(); // 20

        const lineErro = `${lang({
          lang: request.headers["x-lang"],
          maperKey: maper["generic.errorInLine"],
        })} ${i + 1}: `;

        if (type == "")
          throw new TypeIsEmptyError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (date == "")
          throw new DateIsEmptyError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (product == "")
          throw new ProductIsEmptyError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (value == "")
          throw new ValueIsEmptyError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (seller == "")
          throw new SellerIsEmptyError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (!this.validTypeString(typesIds, type))
          throw new TypeIsInvalidError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (!this.validDateString(date))
          throw new DateIsInvalidError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });
        if (!this.validValueString(value))
          throw new ValueIsInvalidError({
            language: request.headers["x-lang"],
            prefixMessage: lineErro,
          });

        const cType = typesIndexed[type];
        const transaction = {
          typeId: type,
          date: date,
          product: product,
          value: cType.operator == "+" ? value : -value,
          seller: seller,
        };

        transactions.push(transaction);
      }
    }

    if (transactions.length == 0)
      throw new Error(
        lang({
          lang: request.headers["x-lang"],
          maperKey: maper["transaction.import.txt.error.zero.transactions"],
        })
      );

    transactions.forEach(async (transaction) => {
      await this.transactionRepository.store(transaction);
    });
  }

  validTypeString(validTypes, typeString) {
    const regex = /^[0-9]+$/;
    if (!regex.test(typeString)) return false;
    if (!validTypes.includes(Number(typeString))) return false;
    return true;
  }

  validDateString(dateString) {
    const regexISO8601 =
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)(?:Z|[-+]\d{2}:\d{2}))$/;
    if (!regexISO8601.test(dateString)) return false;
    return true;
  }

  validValueString(valueString) {
    const regex = /^[0-9]+$/;
    if (!regex.test(valueString)) return false;
    return true;
  }
}

export default ImportTransactionsByTxtFileService;
