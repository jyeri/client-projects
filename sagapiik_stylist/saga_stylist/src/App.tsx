import { useState } from 'react';
import { Header } from './components/header/header';
import { Editorial } from './components/editorial/editorial';
import { Commercial } from './components/commercial/commercial';
import { Aboutme } from './components/aboutme/aboutme';
import { AnimatePresence, motion } from 'framer-motion';

// Define the valid component types
type ComponentType = 'Editorial' | 'Commercial' | 'AboutMe';

function App() {
    const [activeComponent, setActiveComponent] =
        useState<ComponentType>('Editorial');

    // Lookup object for components, typed with ComponentType keys
    const components: Record<ComponentType, JSX.Element> = {
        Editorial: <Editorial />,
        Commercial: <Commercial />,
        AboutMe: <Aboutme />,
    };

    return (
        <div>
            <Header
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
            />
            <main className="relative">
                {/* Animation wrapper to handle smooth transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeComponent}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        {components[activeComponent]}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
