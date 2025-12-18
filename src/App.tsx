import { useState, useMemo } from 'react';
import { 
  Download, Plus, Trash2, TrendingUp, TrendingDown, 
  DollarSign, Calendar, LayoutDashboard, Wallet, 
  ArrowUpRight, ArrowDownLeft, PieChart, Info
} from 'lucide-react';

const FinanceTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-01-01', category: 'Office Rent', amount: 50000, description: 'Monthly office rent', paymentDate: '1st of month' },
    { id: 2, date: '2025-01-07', category: 'Salaries', amount: 350000, description: 'Team salaries - January', paymentDate: '7th of month' },
    { id: 3, date: '2025-01-07', category: 'Founder Expense (KP)', amount: 75000, description: 'KP remuneration - January', paymentDate: '7th of month' },
  ]);
  
  const [income, setIncome] = useState([
    { id: 1, date: '2025-01-15', category: 'Website Development', amount: 150000, client: 'Client A', project: 'E-commerce Website' },
    { id: 2, date: '2025-01-20', category: 'Digital Marketing', amount: 80000, client: 'Client B', project: 'Social Media Campaign' },
  ]);

  const [newExpense, setNewExpense] = useState({ date: '', category: '', amount: '', description: '', paymentDate: '' });
  const [newIncome, setNewIncome] = useState({ date: '', category: '', amount: '', client: '', project: '' });

  const categories = {
    expense: ['Office Rent', 'Salaries', 'Founder Expense (KP)', 'Laptops & Equipment', 'Software Subscriptions', 'Marketing', 'Utilities', 'Travel', 'Other'],
    income: ['Website Development', 'Mobile App Development', 'Digital Marketing', 'Video Ads', 'AI Agents', 'Consulting', 'Retainer', 'Other']
  };

  const addExpense = () => {
    if (newExpense.date && newExpense.category && newExpense.amount) {
      setExpenses([{ ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }, ...expenses]);
      setNewExpense({ date: '', category: '', amount: '', description: '', paymentDate: '' });
    }
  };

  const addIncome = () => {
    if (newIncome.date && newIncome.category && newIncome.amount) {
      setIncome([{ ...newIncome, id: Date.now(), amount: parseFloat(newIncome.amount) }, ...income]);
      setNewIncome({ date: '', category: '', amount: '', client: '', project: '' });
    }
  };

  const deleteExpense = (id: number) => setExpenses(expenses.filter(e => e.id !== id));
  const deleteIncome = (id: number) => setIncome(income.filter(i => i.id !== id));

  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
    const netProfit = totalIncome - totalExpenses;
    
    return { totalExpenses, totalIncome, netProfit };
  }, [expenses, income]);

  const exportToCSV = () => {
    const csvContent = [
      ['Avani Enterprises - Financial Report'],
      [''],
      ['Summary'],
      ['Total Income', stats.totalIncome],
      ['Total Expenses', stats.totalExpenses],
      ['Net Profit', stats.netProfit],
      [''],
      ['Income Details'],
      ['Date', 'Category', 'Amount', 'Client', 'Project'],
      ...income.map(i => [i.date, i.category, i.amount, i.client, i.project]),
      [''],
      ['Expense Details'],
      ['Date', 'Category', 'Amount', 'Description', 'Payment Date'],
      ...expenses.map(e => [e.date, e.category, e.amount, e.description, e.paymentDate])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avani_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Wallet size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Avani Enterprises</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Smart Finance Portal</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1 rounded-2xl">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'income', label: 'Revenue', icon: ArrowUpRight },
              { id: 'expenses', label: 'Expenses', icon: ArrowDownLeft },
              { id: 'projections', label: 'Analysis', icon: PieChart },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <button onClick={exportToCSV} className="btn-primary">
            <Download size={18} />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="modern-card p-8 bg-blue-600 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <TrendingUp size={120} />
                </div>
                <p className="text-blue-100 font-medium mb-1">Total Revenue</p>
                <h2 className="text-4xl font-bold mb-6">₹{stats.totalIncome.toLocaleString('en-IN')}</h2>
                <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full text-sm">
                  <ArrowUpRight size={14} />
                  <span>Growth Tracked</span>
                </div>
              </div>

              <div className="modern-card p-8 bg-white text-slate-900 relative">
                <div className="absolute top-8 right-8 text-slate-200">
                  <TrendingDown size={48} />
                </div>
                <p className="text-slate-500 font-medium mb-1">Operating Expenses</p>
                <h2 className="text-4xl font-bold mb-6">₹{stats.totalExpenses.toLocaleString('en-IN')}</h2>
                <div className="flex items-center gap-2 bg-slate-50 text-slate-600 w-fit px-3 py-1 rounded-full text-sm">
                  <ArrowDownLeft size={14} />
                  <span>Expense Control</span>
                </div>
              </div>

              <div className="modern-card p-8 bg-slate-900 text-white relative">
                <div className="absolute top-8 right-8 text-blue-500/20">
                  <DollarSign size={48} />
                </div>
                <p className="text-slate-400 font-medium mb-1">Net Margin</p>
                <h2 className={`text-4xl font-bold mb-6 ${stats.netProfit >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                  ₹{stats.netProfit.toLocaleString('en-IN')}
                </h2>
                <div className="flex items-center gap-2 bg-white/5 text-slate-400 w-fit px-3 py-1 rounded-full text-sm">
                  <PieChart size={14} />
                  <span>Portfolio Health</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Reminders Card */}
              <div className="modern-card p-8 bg-amber-50/50 border-amber-100 flex gap-6 items-start">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Payment Schedule</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-amber-100 shadow-sm shadow-amber-50">
                      <span className="font-semibold text-slate-700">Office Rent Due</span>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">1st Jan</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-amber-100 shadow-sm shadow-amber-50">
                      <span className="font-semibold text-slate-700">Salary Payouts</span>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">7th Jan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Analysis Card */}
              <div className="modern-card p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Revenue Sources</h3>
                <div className="space-y-4">
                  {categories.income.slice(0, 4).map((cat, idx) => (
                    <div key={cat} className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${['bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-green-500'][idx]}`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-700">{cat}</p>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                          <div className={`h-full ${['bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-green-500'][idx]}`} style={{ width: `${80 - idx * 15}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'income' || activeTab === 'expenses') && (
          <div className="space-y-8 animate-fade-in">
            {/* Add New Entry Form */}
            <div className="modern-card p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Plus size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {activeTab === 'income' ? 'Track New Revenue' : 'Record New Expense'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-2 tracking-wider">Date</label>
                  <input
                    type="date"
                    value={activeTab === 'income' ? newIncome.date : newExpense.date}
                    onChange={(e) => activeTab === 'income' 
                      ? setNewIncome({...newIncome, date: e.target.value})
                      : setNewExpense({...newExpense, date: e.target.value})}
                    className="input-modern"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-2 tracking-wider">Category</label>
                  <select
                    value={activeTab === 'income' ? newIncome.category : newExpense.category}
                    onChange={(e) => activeTab === 'income'
                      ? setNewIncome({...newIncome, category: e.target.value})
                      : setNewExpense({...newExpense, category: e.target.value})}
                    className="input-modern appearance-none"
                  >
                    <option value="">Choose Service</option>
                    {categories[activeTab === 'income' ? 'income' : 'expense'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-2 tracking-wider">Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={activeTab === 'income' ? newIncome.amount : newExpense.amount}
                    onChange={(e) => activeTab === 'income'
                      ? setNewIncome({...newIncome, amount: e.target.value})
                      : setNewExpense({...newExpense, amount: e.target.value})}
                    className="input-modern"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-2 tracking-wider">
                    {activeTab === 'income' ? 'Client & Project' : 'Description'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={activeTab === 'income' ? "Client Name" : "Purpose"}
                      value={activeTab === 'income' ? newIncome.client : newExpense.description}
                      onChange={(e) => activeTab === 'income'
                        ? setNewIncome({...newIncome, client: e.target.value})
                        : setNewExpense({...newExpense, description: e.target.value})}
                      className="input-modern"
                    />
                    <input
                      type="text"
                      placeholder={activeTab === 'income' ? "Project Title" : "Payment Date"}
                      value={activeTab === 'income' ? newIncome.project : newExpense.paymentDate}
                      onChange={(e) => activeTab === 'income'
                        ? setNewIncome({...newIncome, project: e.target.value})
                        : setNewExpense({...newExpense, paymentDate: e.target.value})}
                      className="input-modern"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={activeTab === 'income' ? addIncome : addExpense}
                    className="btn-primary w-full h-[52px]"
                  >
                    <Plus size={20} />
                    Confirm Entry
                  </button>
                </div>
              </div>
            </div>

            {/* List Table */}
            <div className="modern-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Entry Details</th>
                    <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                    <th className="px-8 py-5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {(activeTab === 'income' ? income : expenses).map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900 mb-0.5">
                          {activeTab === 'income' ? item.client : item.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar size={12} />
                          <span>{item.date}</span>
                          {activeTab === 'income' && item.project && (
                            <>
                              <div className="w-1 h-1 rounded-full bg-slate-200" />
                              <span>{item.project}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-semibold text-slate-600">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">{item.category}</span>
                      </td>
                      <td className={`px-8 py-6 text-right font-black text-lg ${activeTab === 'income' ? 'text-blue-600' : 'text-slate-900'}`}>
                        {activeTab === 'income' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => activeTab === 'income' ? deleteIncome(item.id) : deleteExpense(item.id)}
                          className="w-10 h-10 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(activeTab === 'income' ? income : expenses).length === 0 && (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                    <Info size={32} />
                  </div>
                  <p className="text-slate-400 font-medium">No recorded transactions for this month</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'projections' && (
          <div className="space-y-6 animate-fade-in">
            <div className="modern-card p-10 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-3">Intelligent Analysis</h2>
                <p className="text-slate-400 max-w-lg">Advanced insights generated from your current revenue flows and operational patterns at Avani Enterprises.</p>
              </div>
              <div className="p-1.5 bg-white/5 rounded-2xl flex gap-1">
                <button className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-bold">Monthly View</button>
                <button className="px-6 py-2 hover:bg-white/5 rounded-xl text-sm font-bold opacity-60">Yearly Forecast</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="modern-card p-8 group">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-between">
                  Monthly Run-rate
                  <ArrowUpRight className="text-blue-600" size={16} />
                </h3>
                <h4 className="text-3xl font-black text-slate-900 mb-2">₹{stats.totalIncome.toLocaleString('en-IN')}</h4>
                <p className="text-sm text-slate-500 mb-6">Current projected inflow</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="modern-card p-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Revenue Target</h3>
                <h4 className="text-3xl font-black text-teal-500 mb-2">₹{Math.round(stats.totalExpenses * 1.3).toLocaleString('en-IN')}</h4>
                <p className="text-sm text-slate-500 mb-6">Target for 30% Net Profit</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${Math.min((stats.totalIncome / (stats.totalExpenses * 1.3)) * 100, 100)}%` }} />
                </div>
              </div>

              <div className="modern-card p-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Profitability Index</h3>
                <h4 className={`text-3xl font-black mb-2 ${stats.netProfit >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                  {stats.totalIncome > 0 ? ((stats.netProfit / stats.totalIncome) * 100).toFixed(1) : 0}%
                </h4>
                <p className="text-sm text-slate-500 mb-6">{stats.netProfit >= 0 ? 'Optimal Margins' : 'Action Required'}</p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${stats.netProfit >= 0 ? 'bg-blue-600' : 'bg-red-500'}`} style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            <div className="modern-card p-10">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Growth Roadmap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "High-Margin Focus", desc: "Prioritize AI Agents and Video Ad production for maximum ROI.", icon: "🎯" },
                  { title: "Predictable Cashflow", desc: "Convert digital marketing clients to quarterly retainer contracts.", icon: "⚡" },
                  { title: "Equipment Optimization", desc: "Transition large hardware costs towards monthly leasing models.", icon: "💻" },
                  { title: "Reserve Shield", desc: "Maintain 20% of net margin for liquidity and emergency capital.", icon: "🛡️" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 transition-all">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FinanceTracker;
