const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 8080;
const fs = require("fs");
const imageModel = require("./models/models.js");
const votermodel = require("./models/votermodel.js")
const registerindex = require("./models/registerindex")
const candidatemodel = require("./models/candidateregister.js");
const tokenmodel = require('./models/tokenRegistration.js')
const { db } = require("./models/registerindex");
const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { firebaseNotification } = require("./firebaseNotification.js");
const sdk = new ThirdwebSDK("http://127.0.0.1:8545");
const { readContract, resolveMethod } = require("thirdweb");
const { contract } = require('./contract.js');
const { contractAdr } = require("./env.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://munidb:muniak47*@cluster0.66r4gby.mongodb.net/voting',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpeg|jpg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }
    cb(null, true);
  },
}).fields([
  { name: 'partyImage', maxCount: 1 },
  { name: 'candidateImage', maxCount: 1 },
]);

// Instances

const server = http.createServer(app);

// End point
app.get('/', (req, res) => {
  res.json("Api is working");
})

app.post('/addVoter', (req, res) => {
  const voter = votermodel({
    address: req.body.address,
    alreadyvoted: false
  });
  voter.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

app.post('/updatevoter', (req, res) => {
  var myquery = { address: req.body.address };
  votermodel.updateOne(myquery, { alreadyvoted: true })
    .then(result => {
      console.log("1 document updated");
      res.send("1 document updated"); // Sending response after successful update
    })
    .catch(error => {
      console.error("Error updating document:", error);
      res.status(500).send("Error updating document"); // Sending error response
    });
});

app.post('/addCandidate', upload, (req, res) => {
  const voter = candidatemodel({
    partyName: req.body.partyName,
    partySymbol: req.body.shortLetter,
    candidateName: req.body.candidateName,
    address: req.body.city + ',' + req.body.state + ',' + req.body.zip,
    partyImage: {
      data: fs.readFileSync("uploads/" + req.files['partyImage'][0].filename),
      contentType: "image/png",
    },
    candidateImage: {
      data: fs.readFileSync("uploads/" + req.files['candidateImage'][0].filename),
      contentType: "image/png",
    },
  });
  voter.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

app.post('/checkvoter', async (req, res) => {
  try {
    const result = await votermodel.find({ address: req.body.address }, { alreadyvoted: 1 });
    console.log(result);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get('/getcandidate', async (req, res) => {
  try {
    const result = await candidatemodel.find({});
    // console.log(result)
    res.send(result);
  } catch (err) {
    throw err;
  }
})

app.get('/getTokens', async (req, res) => {
  try {
    const result = await tokenmodel.find();
    res.send(result);
  }
  catch (e) {
    throw e;
  }
})

app.post('/userRegistration', async (req, res) => {
  console.log("userRegistration", req.body.registrationToken)
  const token = tokenmodel({
    token: req.body.registrationToken
  })
  token.save().then(result => {
    res.send(result)
  })
    .catch(err => console.log(err))
})



app.get('/trigger', async (req, res) => {
  await firebaseNotification()
})

const trigger = async () => {
  try {
    const data = await readContract({
      contract,
      method: resolveMethod("getWinner"),
    });
    console.log("trigger", data)
    if (data) {
      const result = await tokenmodel.find();
      console.log(result)
      if (result?.length>0) {
        let tokens = result.map(item=>item.token)
        firebaseNotification(tokens, data);
      }
    }
  }
  catch (e) {
    console.log(e)
  }

}

async function runEvents() {
  try {
    const contractAddress = await contractAdr;
    const contract = await sdk.getContract(contractAddress);
    console.log("Listening to contract...");
    contract.events.listenToAllEvents((event) => {
      if (Number(event.data.value._hex) === 2) {
        trigger()
      }
      console.log("ABCD ", Number(event.data.value._hex))
    });
  }
  catch (e) {
    console.log("Err", e)
  }
}

runEvents().catch(err => console.error("Error running events:", err));





var keywords = [];
app.post("/upload", (req, res) => {
  console.log(req.body.tags)
  keywords = (req.body.tags).split(",");
  keywords.push("tfddrgr");
  const saveImage = imageModel({
    Businessname: req.body.Businessname,
    Owner: req.body.Owner,
    address: req.body.address,
    number: req.body.number,
    landline: req.body.landline,
    email: req.body.email,
    url: req.body.url,
    hours: req.body.hours,
    hours2: req.body.hours2,
    workdays: req.body.workdays,
    about: req.body.about,
    category: req.body.category,
    sub_category: req.body.sub_category,
    keyword: keywords,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
      console.log(typeof (keywords));
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send('image is saved')
});


app.post('/search', async (req, res) => {
  var allData;
  console.log(req.body);
  if (req.body.searched != undefined) {
    console.log(req.body.searched);
    allData = await imageModel.find({ keyword: { $in: [req.body.searchTerm] } });
  }
  else {
    console.log("dSBFB ");
    console.log(req.body.searched);
    allData = await imageModel.find();
  }
  res.json(allData)
  console.log("allData");
})

app.post('/addkeyword', (req, res) => {
  saveNewAddress(req.body)
    .then(result => {
      console.log(result);
      res.send(result);
    })
})
function saveNewAddress(address) {
  return new Promise((resolve, reject) => {
    json.push(address)
    fs.writeFile('F:/project2/testing/public/address-list.json', JSON.stringify(json), (err) => {
      if (err) reject(err)
      resolve("File saved.")
    })
  });
}

app.post('/register', (req, res) => {
  const user = usermodel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
})

app.post('/login', (req, res) => {
  usermodel.findOne({ email: req.body.email, password: req.body.password }, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
  })
})

app.post('/registerindex', (req, res) => {
  var myquery = { name: req.body.auctioner };
  var newvalues = { $push: { auctionlist: req.body.auction_id } };
  usermodel.updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");

  });
  console.log(req.body.datetime)
  var par = (req.body.particular).split(',');
  const register = registerindex({
    auction_id: req.body.auction_id,
    company: req.body.company,
    time: req.body.datetime,
    privacy: req.body.private,
    passcode: req.body.passcode,
    particular: par,
    auctioner: req.body.auctioner
  });
  register
    .save()
    .then((result) => {

      res.send(result);
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });

})

app.post('/auctiondetail', upload, (req, res) => {
  console.log(req.body.auction_id)
  const aregister = auctionregister({
    auction_id: req.body.auction_id,
    particular_name: req.body.particular_name,
    // bitter:req.body.bitter,
    startingamt: req.body.startingamt,
    // bidamt:req.body.bidamt,
    // conversation:req.body.conversation,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  aregister
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
})

app.get('/getauctions', (req, res) => {
  registerindex.find({}, (err, result) => {
    if (err) throw err;

    res.send(result)
  })
})

app.post('/auctionnow', (req, res) => {

  console.log(req.body.auctionid)
  auctionregister.find({ auction_id: req.body.auctionid }, (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

app.post('/finishing', (req, res) => {
  console.log(req.body)
  auctionregister.updateOne({ auction_id: req.body.auction_id, particular_name: req.body.itemname }, { $set: { bitter: req.body.bitter, bidamt: req.body.bidamt } }, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

server.listen(8000, () => console.log('Server started on 8000'))
