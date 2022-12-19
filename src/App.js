import MiningPage from "./components/Mining";
import BuyPackagePage from "./components/BuyPackagePage";


function App() {

    document.body.style.backgroundColor = '#263040';

    return (
        <div>
            <MiningPage/>
            <BuyPackagePage/>
        </div>
    );
}

export default App;
