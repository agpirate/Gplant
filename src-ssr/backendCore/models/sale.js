import { mongoose } from "mongoose";
import { saleDBs } from "../dbConns";
import { customerSchema,goodsSchema,productSchema } from "../globalSchemas";
// initialize the connections on boots...
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

//-------
var today = () => new Date().toLocaleString();
const nul = [null, undefined, false, "", [], {}, NaN];

//------------------------------customer Schema
let _customerSchema = new Schema(
  customerSchema,
  {
    timestamps: new Date(),
  }
);

_customerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt=object.updatedAt.toLocaleDateString()

  return object;
});
//------------------------------Goods Schema
let _goodSchema = new Schema(
  goodsSchema,
  {
    timestamps: new Date(),
  }
);

_goodSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.updatedAt=object.updatedAt.toLocaleDateString()

  object.id = _id;

  //--------
  //object.totalPrice = object.totalPrice + (saleIndex.unitPrice * saleIndex.taken)

  return object;
});

//------------------------------Product Schema
let _productSchema = new Schema(
  productSchema,
  {
    timestamps: new Date(),
  }
);

_productSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.updatedAt=object.updatedAt.toLocaleDateString()

  //object.timeA=String(object.timeA).split(" ")[4];
  //object.timeB=String(object.timeB).split(" ")[4];

  return object;
});

//----------------------modeling Schemass  // it would check if model/Document exists or create new Docs.

var custModel;
////console.log('is customerModel Exist',Object.keys(saleDBs.model.customer))
if (saleDBs.model.custModel) {
  //console.log("customers Collections already existed on Procurment");
} else {
  custModel = saleDBs.model("customers", _customerSchema);
}

var goodModel;

if (saleDBs.model.goodModel) {
  //console.log("rawmatterials Collections already existed on Procurment");
} else {
  goodModel = saleDBs.model("goods", _goodSchema);
}

var productModel;

if (saleDBs.model.productModel) {
  //console.log("supplier Collections already existed on Procurment");
} else {
  productModel = saleDBs.model("products", _productSchema);
}

//-------------------- exporting schemas

export { custModel, goodModel, productModel }; //,customerer, goods and pruduct model };
