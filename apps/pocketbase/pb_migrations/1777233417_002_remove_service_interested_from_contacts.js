/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contacts");
  collection.fields.removeByName("service_interested");
  return app.save(collection);
}, (app) => {
  try {

  const collection = app.findCollectionByNameOrId("contacts");
  collection.fields.add(new TextField({
    name: "service_interested",
    required: true
  }));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})