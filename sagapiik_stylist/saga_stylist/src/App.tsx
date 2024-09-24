import { Header } from './components/header/header';
import { Editorial } from './components/editorial/editorial';

function App() {
    return (
        <>
            <Header />
            <main>
                <div className="relative z-10 bg-background">
                    <Editorial />
                </div>
            </main>
            <div>
                <h1>footer</h1>
            </div>
        </>
    );
}

export default App;
