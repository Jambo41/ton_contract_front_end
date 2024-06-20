import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react"; //, useTonAddress 
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
import WebApp from "@twa-dev/sdk";



function App() { // recent_sender,owner_address,
  const {
    contract_address,
    counter_value,
    contract_balance,
    SendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

const { connected } = useTonConnect();

const showAlert = () => {
  const themeParams = WebApp.themeParams;
  const themeSettings = `
    Background Color: ${themeParams.bg_color}
    Text Color: ${themeParams.text_color}
    Hint Color: ${themeParams.hint_color}
    Link Color: ${themeParams.link_color}
    Button Color: ${themeParams.button_color}
    Button Text Color: ${themeParams.button_text_color}
  `;
  WebApp.showAlert(themeSettings);

}

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && (
          <div className='Hint'>{fromNano (contract_balance)}</div> //fromNano to see correct To Amount
          )}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <a onClick={() => {
                showAlert();
              }}>
              Show Theme Settings
            </a>

          <br/>

        {connected && (
            <a onClick={() => {
                SendIncrement();
              }}>
              Increment by 5
            </a>
          )}

          <br/>
          {connected && (
            <a onClick={() => {
                sendDeposit();
              }}>
              Request deposit of 1 TON
            </a>
          )}

           <br/>
          {connected && (
            <a onClick={() => {
                sendWithdrawalRequest();
              }}>
              Request 0.7 TON withdrawal
            </a>
          )}

      </div>
    </div>
  );
}

export default App;