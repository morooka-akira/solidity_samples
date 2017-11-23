pragma solidity ^0.4.17;


contract Caller {

  function callFunc(address destination, uint value, bytes data) 
  public
  {
    if (!destination.call.value(value)(data)) {
      revert();
    }
  }

  function () 
  payable public {
  }
}
