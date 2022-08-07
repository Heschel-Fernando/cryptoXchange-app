// https://eth-rinkeby.alchemyapi.io/v2/7nVqVLMbfbcynYWGp4oxGfH7DZMviGk9

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/7nVqVLMbfbcynYWGp4oxGfH7DZMviGk9",
      accounts: ["66f43a1ebb0a9d63c28d209ccb785e93208b854863191333e7b3dfc75e7aebf4"],
    },
  },
};
