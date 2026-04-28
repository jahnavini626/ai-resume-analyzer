interface ATSProps {
    score: number;
    suggestions: {
        type: "good" | "improve";
        tip: string;
    }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
    // Determine gradient background based on score
    const gradientBg = 
        score > 69 
            ? "from-green-100 to-green-50" 
            : score > 49 
            ? "from-yellow-100 to-yellow-50" 
            : "from-red-100 to-red-50";

    // Determine icon based on score
    const iconSrc = 
        score > 69 
            ? "/icons/ats-good.svg" 
            : score > 49 
            ? "/icons/ats-warning.svg" 
            : "/icons/ats-bad.svg";

    return (
        <div className={`bg-gradient-to-br ${gradientBg} rounded-2xl p-8 shadow-md`}>
            {/* Top Section with Icon and Headline */}
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS Score" className="w-12 h-12" />
                <h2 className="text-3xl font-bold text-gray-800">
                    ATS Score - {score}/100
                </h2>
            </div>

            {/* Description Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Applicant Tracking System Compatibility
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Your resume's ATS compatibility score reflects how well your document is formatted 
                    and structured to pass through automated applicant tracking systems used by most employers.
                </p>
            </div>

            {/* Suggestions List */}
            <div className="mb-8">
                <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <img 
                                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                                alt={suggestion.type} 
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                            />
                            <span className="text-gray-700 text-sm">{suggestion.tip}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Closing Line */}
            <div className="pt-4 border-t border-gray-300">
                <p className="text-gray-700 text-sm font-medium">
                    Implement these suggestions to improve your ATS score and increase your chances of being reviewed by hiring managers.
                </p>
            </div>
        </div>
    );
};

export default ATS;