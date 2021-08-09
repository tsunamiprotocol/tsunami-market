import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MnemonicKey, LCDClient, MsgSend } from '@terra-money/terra.js';

@Injectable({
  providedIn: 'root'
})
export class TransactService {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  buyDataSet(ust) {
    // create a key out of a mnemonic
    const mk = new MnemonicKey({
      mnemonic:
        'uncover help goose erupt next gauge dinner any joy humble gown ugly spirit employ truly dwarf deal attract weasel soft bless risk flat traffic',
    });

    // connect to soju testnet
    const terra = new LCDClient({
      URL: 'https://tequila-lcd.terra.dev',
      chainID: 'tequila-0004',
    });

    const wallet = terra.wallet(mk);
    var value = (ust) * Math.pow(10, 6);
    console.log(value);
    
    const send = new MsgSend(
      'terra1dcqpvtl8mt4sxsv0nwl2dgqfq79qc2569rpl3a',
      'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
      { uusd: value }
    );

    wallet
      .createAndSignTx({
        msgs: [send],
        memo: '0xc0c3DbFA4206B687C8684B9295527EDA624f017D',
      })
      .then(tx => terra.tx.broadcast(tx))
      .then(result => {
        console.log(`TX hash: ${result.txhash}`);
      });

  }
}
