const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");
const Product = require("../app/models/Product");
const fetch = require("node-fetch");

// Product.find({ deletedAt: null }).then((products) => {
//   console.log("👌 ~ products", products);
//   parentPort.postMessage(products);
// });

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: "Hello, worker!",
  });
  worker.on("message", (message) => {
    console.log(`Received message from worker: ${message}`);
  });
  worker.on("exit", (code) => {
    console.log(`Worker stopped with exit code ${code}`);
  });
} else {
  const data = workerData;
  console.log(`Received message from main thread: ${data}`);
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=beef")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      parentPort.postMessage(data);
    });
  // Product.find({ deletedAt: null }).then((products) => {
  //   console.log("👌 ~ products", products);
  //   parentPort.postMessage(products);
  // }).catch((err) => {
  //   console.log("🚀 ~ file: getProductsWorker.js ~ line 85 ~ err", err)
  //   parentPort.postMessage(err);
  // });

  // parentPort.postMessage("Hello, main thread!");
}

// parentPort.postMessage("Hello, main thread!");

// if (isMainThread) {
//   module.exports = function parseJSAsync(script) {
//     return new Promise((resolve, reject) => {
//       const worker = new Worker(__filename, {
//         workerData: script,
//       });
//       worker.on('message', resolve);
//       worker.on('error', reject);
//       worker.on('exit', (code) => {
//         if (code !== 0)
//           reject(new Error(`Worker stopped with exit code ${code}`));
//       });
//     });
//   };
// } else {
//   const { parse } = require('some-js-parsing-library');
//   const script = workerData;
//   parentPort.postMessage(parse(script));
// }

// if (isMainThread) {
//   // This code is running in the main thread.
//   // Create a worker thread.
//   const worker = new Worker(__filename);
//   worker.on("message", (message) => {
//     console.log(`Received message from worker: ${message}`);
//   });
//   worker.on("exit", (code) => {
//     console.log(`Worker exited with code ${code}`);
//   });

//   // Send a message to the worker thread.
//   worker.postMessage("Hello, worker!");
// } else {
//   // This code is running in the worker thread.
//   process.on("message", (message) => {
//     console.log(`Received message from main thread: ${message}`);

//     // Send a message back to the main thread.
//     process.send("Hello, main thread!");
//   });
// }
