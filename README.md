# Nova X Learning Platform

A modern, interactive learning platform designed to provide an engaging educational experience through structured learning stages.

## 🚀 Features

- **Interactive Learning Stages**: Multi-stage learning flow with seamless transitions
- **Real-time Problem Presentation**: Dynamic problem display with typing animations
- **AI-Powered Explanations**: Detailed concept explanations with code examples
- **Progress Tracking**: Visual progress indicators throughout the learning journey
- **Responsive Design**: Modern UI that works across all devices

## 📁 Project Structure

```
src/
├── components/
│   ├── study/
│   │   ├── DefaultStage.tsx      # Initial learning interface
│   │   ├── ExplanationStage.tsx  # Detailed concept explanations
│   │   ├── FinalSolutionStage.tsx # Solution generation and review
│   │   ├── RealisationStage.tsx  # Problem understanding and analysis
│   │   ├── RecallStage.tsx       # Knowledge retention and testing
│   │   └── CodeBlock.tsx         # Code display component
│   ├── ui/                       # Reusable UI components
│   └── element/                  # Custom elements
├── pages/                        # Main page components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and API
└── styles/                       # Global styles and animations
```

## 🎯 Learning Flow

The platform implements a structured 5-stage learning process:

1. **Default Stage** - Initial interaction and problem presentation
2. **Explanation Stage** - Detailed concept breakdown and theory
3. **Final Solution Stage** - Solution generation and review
4. **Realisation Stage** - Problem understanding and analysis
5. **Recall Stage** - Knowledge retention and testing

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nova-x-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Recent Updates

### Version 1.0.0 - Stage Renaming and Documentation

- **Renamed** `ConversationStage` to `DefaultStage` for better clarity
- **Enhanced** English documentation throughout the codebase
- **Improved** component structure and prop interfaces
- **Added** comprehensive JSDoc comments
- **Updated** progress indicators and UI labels

### Key Changes

1. **Component Renaming**: 
   - `ConversationStage.tsx` → `DefaultStage.tsx`
   - Updated all imports and references

2. **Documentation Improvements**:
   - Added comprehensive file headers
   - Enhanced function documentation
   - Improved type definitions
   - Added inline comments for complex logic

3. **Code Quality**:
   - Better TypeScript interfaces
   - Improved error handling
   - Enhanced code organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Nova X Team** - Building the future of interactive learning

---

*Built with ❤️ for better education*
