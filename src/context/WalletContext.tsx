"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of our wallet context
interface WalletContextType {
  balance: number;
  transactionHistory: { amount: number; type: string; date: string }[];
  topUp: (amount: number) => Promise<void>;
  deductAmount: (amount: number) => Promise<boolean>;
  getTransactionHistory: () => void;
}

// Define the props for WalletProvider
interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Mocking API calls with setTimeout (to be replaced by actual API calls)
const mockBankingApi = {
  getBalance: async () => 100, // Starting balance
  getTransactionHistory: async () => [
    { amount: 50, type: "top-up", date: "2023-04-23" },
    { amount: -20, type: "purchase", date: "2023-04-22" },
  ],
  topUp: async (amount: number) => {
    return { success: true, newBalance: 100 + amount };
  },
  deduct: async (amount: number) => {
    return { success: true, newBalance: 100 - amount };
  },
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<
    { amount: number; type: string; date: string }[]
  >([]);

  useEffect(() => {
    // Fetch initial balance and transaction history
    const fetchData = async () => {
      const balance = await mockBankingApi.getBalance();
      const history = await mockBankingApi.getTransactionHistory();
      setBalance(balance);
      setTransactionHistory(history);
    };

    fetchData();
  }, []);

  const topUp = async (amount: number) => {
    const response = await mockBankingApi.topUp(amount);
    if (response.success) {
      setBalance(response.newBalance);
      const newTransaction = {
        amount,
        type: "top-up",
        date: new Date().toISOString(),
      };
      setTransactionHistory([...transactionHistory, newTransaction]);
    }
  };

  const deductAmount = async (amount: number) => {
    if (balance >= amount) {
      const response = await mockBankingApi.deduct(amount);
      if (response.success) {
        setBalance(response.newBalance);
        const newTransaction = {
          amount: -amount,
          type: "purchase",
          date: new Date().toISOString(),
        };
        setTransactionHistory([...transactionHistory, newTransaction]);
        return true;
      }
    }
    return false;
  };

  const getTransactionHistory = async () => {
    const history = await mockBankingApi.getTransactionHistory();
    setTransactionHistory(history);
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactionHistory,
        topUp,
        deductAmount,
        getTransactionHistory,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
