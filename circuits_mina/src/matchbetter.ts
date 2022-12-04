import {
    Field,
    SmartContract,
    DeployArgs,
    Permissions,
    state, 
    State,
    method, 
    Circuit,
    Bool,
    Struct,
    isReady
  } from 'snarkyjs';

  await isReady;


  class History extends Struct({
    history: [Field, Field],
  }) {}
  
  export class MatchMeBetter extends SmartContract {
    @state(Field) keyword = State<Field>();    
    @state(History) history = State<History>();
    @state(Bool) result = State<Bool>();
    deploy(args: DeployArgs) {
      super.deploy(args);
      this.setPermissions({
        ...Permissions.default(),
        editState: Permissions.proofOrSignature(),
      });
    }
    @method initState(history: History, keyword: Field) {
            this.keyword.set(keyword);
            this.history.set(history);
            this.result.set(Bool(false));
        }
    @method checkComputation(treshold: Field) {
        this.keyword.assertEquals(this.keyword.get());
        this.history.assertEquals(this.history.get());
        let temp = new Field(1);
        let product = new Field(1);
        for (let i = 0; i < 2; i++) {
            product = this.history.get().history[i].mul(this.keyword.get());
            temp.add(this.history.get().history[i].square());
        }
        temp = temp.sqrt();
        product = product.div(temp);
        const x = Circuit.if(product.gte(treshold) , Bool(true), Bool(false));
        this.result.set(x);
        
    }
  }