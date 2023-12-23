import { Entity, createSchema } from "electrodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const table = "electro";
const Book = new Entity(
  {
    model: {
      entity: "book",
      version: "1",
      service: "store",
    },
    attributes: {
      storeId: {
        type: "string",
      },
      bookId: {
        type: "string",
      },
      price: {
        type: "number",
        required: true,
      },
      title: {
        type: "string",
      },
      author: {
        type: "string",
      },
      condition: {
        type: ["EXCELLENT", "GOOD", "FAIR", "POOR"] as const,
        required: true,
      },
      genre: {
        type: "set",
        items: "string",
      },
      published: {
        type: "string",
      },
    },
    indexes: {
      byLocation: {
        pk: {
          // highlight-next-line
          field: "pk",
          composite: ["storeId"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          composite: ["bookId"],
        },
      },
      byAuthor: {
        // highlight-next-line
        index: "gsi1pk-gsi1sk-index",
        pk: {
          // highlight-next-line
          field: "gsi1pk",
          composite: ["author"],
        },
        sk: {
          // highlight-next-line
          field: "gsi1sk",
          composite: ["title"],
        },
      },
    },
    // add your DocumentClient and TableName as a second parameter
  },
  { client, table }
);

describe("ElectroDB Tests", () => {
  before(async () => {
    console.log("before: deleting book");
    const result = await Book.delete({
      bookId: "beedabe8-e34e-4d41-9272-0755be9a2a9f",
      storeId: "pdx-45",
    }).go();
    console.log(result);
  });

  it("should create a book", async () => {
    await Book.create({
      bookId: "beedabe8-e34e-4d41-9272-0755be9a2a9f",
      storeId: "pdx-45",
      author: "Stephen King",
      title: "IT",
      condition: "GOOD",
      price: 15,
      genre: ["HORROR", "THRILLER"],
      published: "1986-09-15",
    }).go();
  });

  it("patches a book", async () => {
    await Book.patch({
      bookId: "beedabe8-e34e-4d41-9272-0755be9a2a9f",
      storeId: "pdx-45",
    })
      .set({
        price: 10,
        condition: "FAIR",
      })
      .go();
  });

  it("gets a book", async () => {
    const book = await Book.get({
      bookId: "beedabe8-e34e-4d41-9272-0755be9a2a9f",
      storeId: "pdx-45",
    }).go();
    console.log(book);
  });

  it("gets books by author", async () => {
    const { data, cursor } = await Book.query
      .byAuthor({ author: "Stephen King" })
      .go();

    console.log(data);
  });

  it("gets books by location", async () => {
    const { data, cursor } = await Book.query
      .byLocation({ storeId: "pdx-45" })
      .where(({ price }, { lte }) => lte(price, 10))
      .go();

    console.log(data);
  });
});
