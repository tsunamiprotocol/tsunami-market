import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LCDClient, MnemonicKey, MsgSend } from '@terra-money/terra.js';
import { TransactService } from 'src/app/services/transact.service';
import Web3 from 'web3';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
  datasets: any;
  _aggregatorV3InterfaceABI: any;
  oceanPrice: number = 1;
  ethPrice: number = 1;


  constructor(private httpClient: HttpClient, private transactService: TransactService,private route: ActivatedRoute,
    private router: Router) {
    this.httpClient.get("https://aquarius.ropsten.oceanprotocol.com/api/v1/aquarius/assets/ddo").subscribe((val: any) => {
      this.datasets = val;
      console.log(this.datasets);
    })

    this.httpClient.get("assets/chainLinkInterfaceABI.json").subscribe((data: any) => {
      this._aggregatorV3InterfaceABI = data.aggregatorV3InterfaceABI;
      this.getChainLinkData("0x7ece4e4E206eD913D991a074A19C192142726797", 'E');
    })

  }

  getChainLinkData(contractAddress: string, token: string) {
    var web3 = new Web3("https://mainnet.infura.io/v3/34139380df974a6f9e0d70bf2312fdd4");
    const addr = contractAddress;
    var priceFeed = new web3.eth.Contract(this._aggregatorV3InterfaceABI, addr);
    priceFeed.methods.latestRoundData().call()
      .then((roundData: any) => {
        this.ethPrice = roundData[1] * Math.pow(10, -8);
      });

  }

  async buyDataSet(ust) {
    await this.transactService.buyDataSet(Math.round(ust * 100) / 100 );
    this.router.navigate(['/buy']);
  }

  ngOnInit(): void {
  }


}
