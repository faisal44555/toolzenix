import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Search, Landmark, TrendingUp, CreditCard, Banknote, Percent, PiggyBank, Coins, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "EMI Calculator",
    description: "Calculate Equated Monthly Installment for loans.",
    icon: <TrendingUp className="w-6 h-6" />,
    link: "/emi-calculator",
    color: "bg-green-500"
  },
  {
    title: "Loan Interest Calculator",
    description: "Estimate total interest paid over loan term.",
    icon: <Percent className="w-6 h-6" />,
    link: "/loan-interest-calculator",
    color: "bg-blue-500"
  },
  {
    title: "Credit Card Payoff Calculator",
    description: "Calculate time to repay credit card debt.",
    icon: <CreditCard className="w-6 h-6" />,
    link: "/credit-card-payoff-calculator",
    color: "bg-red-500"
  },
  {
    title: "Simple Interest Calculator",
    description: "Calculate simple interest on loans/savings.",
    icon: <Banknote className="w-6 h-6" />,
    link: "/finance-simple-interest-calculator",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "Compound Interest Calculator",
    description: "Calculate compound interest for investments.",
    icon: <TrendingUp className="w-6 h-6" />,
    link: "/finance-compound-interest-calculator",
    color: "bg-purple-500"
  },
  {
    title: "GST Calculator",
    description: "Add or remove GST from an amount.",
    icon: <Percent className="w-6 h-6" />,
    link: "/gst-calculator",
    color: "bg-teal-500"
  },
  {
    title: "SIP Calculator",
    description: "Estimate mutual fund SIP returns.",
    icon: <PiggyBank className="w-6 h-6" />,
    link: "/sip-calculator",
    color: "bg-pink-500"
  },
  {
    title: "Static Currency Converter",
    description: "Convert currencies with static (non-live) rates.",
    icon: <Coins className="w-6 h-6" />,
    link: "/static-currency-converter",
    color: "bg-orange-500"
  }
];

const FinanceToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const relatedCategoriesList = ["Math Tools", "Unit Converters"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <>
      <Helmet>
        <title>Finance Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="A suite of free online finance calculators and converters. Manage loans, investments, taxes, and savings with tools like EMI calculator, GST calculator, SIP calculator, and more. All client-side for your privacy."
        />
        <link rel="canonical" href="https://toolzenix.com/finance-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <Landmark className="w-16 h-16 text-emerald-600 dark:text-emerald-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Finance Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Empower your financial decisions with our comprehensive suite of calculators and converters.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search finance tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search finance tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={tool.link} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`${tool.color} p-3 rounded-lg text-white`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true })}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No tools found for your search. Try a different keyword!
          </p>
        )}
        
        <div className="mt-16 w-full max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Related Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCategories.map(cat => {
                const Icon = LucideIcons[cat.icon] || LucideIcons.Folder;
                return (
                  <div
                    key={cat.path}
                    className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:scale-103"
                  >
                    <Link to={cat.path} className="group">
                      <div className="flex items-center mb-3">
                        <Icon className={cn("w-8 h-8 mr-4", cat.color)} />
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{cat.name}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
        </div>

        <div
          className="mt-12 bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Secure & Simple</h2>
          <p className="text-gray-200">
            All calculations happen directly in your browser. Your financial data is never sent to our servers.
          </p>
        </div>
      </div>
    </>
  );
};

export default FinanceToolsPage;