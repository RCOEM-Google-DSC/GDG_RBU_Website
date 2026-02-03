import React from 'react';
const Philosophy: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <span className="px-4 py-2 border-y border-gray-200 dark:border-gray-700 text-xs font-semibold tracking-[0.2em] uppercase">My Philosophy</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-center mb-16 leading-tight">
          Code driven, <span className="italic text-secondary">data smart.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-xl bg-background-light dark:bg-background-dark hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 font-display">Clean Architecture</h3>
            <p className="text-muted-light dark:text-muted-dark text-sm leading-relaxed">
              I believe software should be as beautiful on the inside as it is on the outside. Maintainable, scalable code is my standard, not an afterthought.
            </p>
          </div>

          <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-xl bg-background-light dark:bg-background-dark hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 font-display">Performance First</h3>
            <p className="text-muted-light dark:text-muted-dark text-sm leading-relaxed">
              Speed is a feature. I optimize every layer of the stack, from database queries to client-side rendering, ensuring seamless user interactions.
            </p>
          </div>

          <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-xl bg-background-light dark:bg-background-dark hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 font-display">AI Integration</h3>
            <p className="text-muted-light dark:text-muted-dark text-sm leading-relaxed">
              Leveraging the power of Machine Learning to create smarter applications that adapt, learn, and provide personalized value to users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
