
const Caller = artifacts.require('../contracts/Caller.sol');
const Test = artifacts.require('../contracts/Test.sol');

contract('LowLevelCall', (accounts) => {
  before(async () => {
  });

  it('Low level call test.', async () => {
    caller = await Caller.new();
    test = await Test.new();
    // 実行前
    const beforeNum = await test.num();
    const beforeBalance = web3.eth.getBalance(test.address);
    console.log("beforeNum: " + beforeNum);
    console.log("beforeBalance: " + beforeBalance);
    // 予めCallerコントラクトに20wei送っておく
    await caller.send(20);
    // 関数のバイトコードを取り出す
    const data = test.contract.setNum.getData(10);
    console.log("bytecode: " + data);
    // LowLevelCall ※10weiも一緒に送る
    await caller.callFunc(test.address, 20, data);
    // 実行後
    const afterNum = await test.num();
    const afterBalance = web3.eth.getBalance(test.address);
    console.log("afterNum: " + afterNum);
    console.log("afterBalance: " + afterBalance);
  });
});
