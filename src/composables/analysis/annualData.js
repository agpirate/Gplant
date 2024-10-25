import { assetStore } from "src/stores/dataStores/assetStore";
const assetService = assetStore();

let _thisDate = new Date();
let _thisYear = _thisDate.getFullYear();

dateFilter = {
  updatedAt: { $gte: new Date(_thisYear), $lt: new Date(_thisYear + 1) },
};

//find({ airedAt: { $gte: '1987-10-19', $lte: '1987-10-26' } }).
const issudeItems = ""; // assetService.getDatas(dateFilter);

async function issued() {
  return issudeItems;
}

export { issued };
