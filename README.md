## Game Tcha - Interactive CAPTCHA System

Game Tcha is a modern, interactive CAPTCHA system that verifies human users through gameplay instead of traditional text recognition.

### How to Use

1. **Integration**
```jsx
import { GameTcha } from './components/game-tcha/GameTcha';

function YourComponent() {
  return <GameTcha />;
}
```

2. **Gameplay Instructions**
- Move your mouse to control the defender
- Click to shoot at incoming enemies
- Avoid colliding with enemies
- Score points by destroying enemies
- Complete the verification within the time limit

3. **Verification Process**
The system analyzes:
- Mouse movement patterns
- Response times
- Shooting accuracy
- Overall gameplay behavior

### Features

- Interactive gameplay verification
- Anti-bot pattern recognition
- Real-time feedback
- Accessibility considerations
- Mobile-friendly controls

### Technical Details

- Built with React and TypeScript
- Canvas-based rendering
- Framer Motion animations
- Tailwind CSS styling

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Verification Logic

The system uses multiple factors to verify human players:
- Movement variance analysis
- Direction change detection
- Response time patterns
- Action sequence evaluation