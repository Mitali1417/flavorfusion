import { Card } from '@/components/ui/card'
import { Brain, ChefHat, Cpu } from 'lucide-react';

export const HowItWorks = () => {
      const steps = [
        {
          icon: Brain,
          title: "Tell AI Your Preferences",
          description: "Share your favorite ingredients, preferences or cuisine style"
        },
        {
          icon: Cpu,
          title: "AI Analyzes & Creates",
          description: "Our advanced AI processes thousands of flavor combinations"
        },
        {
          icon: ChefHat,
          title: "Get Your Perfect Recipe",
          description: "Get a personalized recipe with step-by-step instructions"
        }
      ];
    
    return (
        <div className="relative h-full w-full">
            <span className={`absolute w-full h-[50%] z-0 bg-gradient-to-b from-black/70 to-transparent`} />
            <h2
                className={`absolute drop-shadow-2xl -mt-6 ml-8`}
            >
                How It Works
            </h2>
            <div
                className={`ai-bg w-full h-full ai-bg py-6 md:py-10 rounded-b-[2rem] md:rounded-b-[4rem] overflow-hidden neo-shadow my-[6rem] `}
            >
                <div
                    className={`py-6 md:py-20 px-8 w-full h-full flex flex-col`}
                >
                    <Card className="flex flex-col justify-center items-center gap-4 max-w-5xl mx-auto p-4 bg-card/50 backdrop-blur-xl rounded-3xl shadow-lg space-y-6 md:space-y-0 md:space-x-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {steps.map((step, index) => (
                                <div key={index} className="flex lg:flex-col lg:items-center gap-3">
                                    <div className="flex items-center justify-center shadow-neo w-8 h-8 sm:w-16 sm:h-16 bg-primary/30 rounded-full">
                                        <step.icon className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                                    </div>
                                    <div className="lg:text-center">
                                        <h5>{step.title}</h5>
                                        <p className="text-xs text-white/40">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>

    )
}
