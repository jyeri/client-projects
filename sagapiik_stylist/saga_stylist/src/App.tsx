import { useState } from 'react';
import { Header } from './components/header/header';
import { Editorial } from './components/editorial/editorial';
import { Commercial } from './components/commercial/commercial';
import { Aboutme } from './components/aboutme/aboutme';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const [activeComponent, setActiveComponent] = useState('Editorial');

    const renderContent = () => {
        switch (activeComponent) {
            case 'Factorial':
                return <Commercial />;
            case 'AboutMe':
                return <Aboutme />;
            default:
                return <Editorial />;
        }
    };

    return (
        <div>
            <Header
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
            />
            <main className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeComponent}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
