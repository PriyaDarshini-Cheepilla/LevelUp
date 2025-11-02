import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { ChatbotDrawer } from "./components/ChatbotDrawer";
import { LandingScreen } from "./components/screens/LandingScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { UploadResumeScreen } from "./components/screens/UploadResumeScreen";
import { CareerPathScreen } from "./components/screens/CareerPathScreen";
import { TestScreen } from "./components/screens/TestScreen";
import { CoursesScreen } from "./components/screens/CoursesScreen";
import { JobsScreen } from "./components/screens/JobsScreen";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

type Screen =
  | "landing"
  | "login"
  | "signup"
  | "dashboard"
  | "upload"
  | "career"
  | "tests"
  | "courses"
  | "jobs"
  | "chatbot";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleNavigate = (screen: Screen) => {
    if (
      !isAuthenticated &&
      [
        "dashboard",
        "upload",
        "career",
        "tests",
        "courses",
        "jobs",
      ].includes(screen)
    ) {
      setCurrentScreen("login");
      return;
    }

    if (screen === "chatbot") {
      setChatbotOpen(true);
      return;
    }

    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen("dashboard");
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentScreen("upload");
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentScreen("upload");
    } else {
      setCurrentScreen("login");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen("landing");
  };

  const showNavbar =
    isAuthenticated &&
    !["landing", "login", "signup"].includes(currentScreen);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      {showNavbar && (
        <Navbar
          currentPage={currentScreen}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentScreen === "landing" && (
            <LandingScreen
              onGetStarted={handleGetStarted}
              onLogin={() => setCurrentScreen("login")}
            />
          )}

          {currentScreen === "login" && (
            <LoginScreen
              onLogin={handleLogin}
              onSignup={handleSignup}
              onBack={() => setCurrentScreen("landing")}
            />
          )}

          {currentScreen === "dashboard" && (
            <DashboardScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === "upload" && (
            <UploadResumeScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === "career" && (
            <CareerPathScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === "tests" && (
            <TestScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === "courses" && (
            <CoursesScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === "jobs" && (
            <JobsScreen onNavigate={handleNavigate} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Chatbot Button */}
      {isAuthenticated && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)]"
            style={{ boxShadow: "var(--shadow-floating)" }}
            onClick={() => setChatbotOpen(true)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Chatbot Drawer */}
      <AnimatePresence>
        {chatbotOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setChatbotOpen(false)}
            />
            {/* Drawer */}
            <ChatbotDrawer
              onClose={() => setChatbotOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}