import { Header } from './components/header/header';
import { Editorial } from './components/editorial/editorial';

function App() {
    return (
        <>
            <Header />
            <main className="relative">
                <Editorial />
            </main>
        </>
    );
}

export default App;
