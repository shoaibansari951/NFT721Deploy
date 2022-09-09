const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "01e3ec508186b084ae69",
  "5263d48040bbff2c91db5376eb7b07f85bc7020a0090a06d6f443e29be75669a"
);

const fs = require("fs");
const file = fs.createReadStream("./44.jpg");

const options = {
  pinataMetadata: {
    name: "4",
    keyvalues: {
      customKey: "nothing special",
      customKey2: "just number 4",
    },
  },
  pinataOptions: {
    cidVersion: 0,
  },
};

const upload = async () => {
  try {
    const check = await pinata.testAuthentication();
    console.log(check);
  } catch (error) {
    console.error(error);
  }

  let imageHash;
  try {
    imageHash = await pinata.pinFileToIPFS(file, options);
    console.log(imageHash);
  } catch (error) {
    console.error(error);
  }

  const imageLink = "https://gateway.pinata.cloud/ipfs/" + imageHash.IpfsHash;
  console.log(imageLink);

  const metaData = {
    description: "Just a picture of a digit 1",
    external_url: "",
    image: imageLink,
    name: "Number 2",
    attributes: [{ number: "2" }],
  };

  try {
    const json = await pinata.pinJSONToIPFS(metaData, options);
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

upload();
