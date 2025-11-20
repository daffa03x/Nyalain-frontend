export type Quick = {
    color: string,
    icon: string,
    name: string,
}

const QuickAction = ({Quick}: {Quick: Quick[]}) => {
    return (
        <div className="px-4 py-6">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">
                Mau berbuat baik apa hari ini?
            </h2>
            <div className="grid grid-cols-4 gap-4">
                {Quick.map((action, index) => (
                <button 
                    key={index} 
                    className="flex flex-col items-center gap-2.5 group transition-all duration-300 hover:-translate-y-1"
                >
                    <div 
                    className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center 
                                transition-all duration-300 shadow-lg shadow-gray-900/10 group-hover:shadow-xl`}
                    >
                        <div className="text-3xl opacity-90">
                            {action.icon}
                        </div>
                    </div>
                    <span className="text-xs text-center font-semibold text-gray-700 leading-tight">
                        {action.name}
                    </span>
                </button>
                ))}
            </div>
        </div>
    )
}

export default QuickAction