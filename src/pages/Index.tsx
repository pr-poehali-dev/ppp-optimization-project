import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  downloadUrl: string;
  energyCost: number;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Silksong',
    image: '/img/2b0b66ca-030d-459b-9e0f-ad9a841a9d6a.jpg',
    category: 'Adventure',
    description: 'Master acrobatic movement in this sequel to Hollow Knight',
    downloadUrl: 'https://example.com/silksong',
    energyCost: 30
  },
  {
    id: 2,
    title: 'GTA 5',
    image: '/img/17dac5e2-7a26-4242-9305-72d4d6bafb87.jpg',
    category: 'Action',
    description: 'Experience the criminal underworld of Los Santos',
    downloadUrl: 'https://example.com/gta5',
    energyCost: 50
  },
  {
    id: 3,
    title: 'Rust',
    image: '/img/00b3d6e2-5d9b-4c4c-b5b3-46f3b1e489aa.jpg',
    category: 'Survival',
    description: 'Survive, build, and dominate in this multiplayer survival game',
    downloadUrl: 'https://example.com/rust',
    energyCost: 40
  },
  {
    id: 4,
    title: 'Geometry Dash',
    image: '/img/4d29789a-be9a-4c38-b5ca-cf70e32cc44e.jpg',
    category: 'Arcade',
    description: 'Jump and fly through danger in this rhythm-based platformer',
    downloadUrl: 'https://example.com/geometrydash',
    energyCost: 20
  },
  {
    id: 5,
    title: 'Skull Island',
    image: '/img/596ae314-90db-4478-b267-858c655c6157.jpg',
    category: 'Adventure',
    description: 'Explore mysterious pirate islands',
    downloadUrl: 'https://example.com/skullisland',
    energyCost: 25
  },
  {
    id: 6,
    title: 'Ocean Raiders',
    image: '/img/e86ceeae-292e-442d-be2a-c974243b594a.jpg',
    category: 'Action',
    description: 'Command your pirate ship fleet',
    downloadUrl: 'https://example.com/oceanraiders',
    energyCost: 35
  },
  {
    id: 7,
    title: 'Treasure Hunt',
    image: '/img/04f20b17-c888-45c8-9e37-442fb5bd283d.jpg',
    category: 'Puzzle',
    description: 'Find legendary pirate treasures',
    downloadUrl: 'https://example.com/treasurehunt',
    energyCost: 15
  },
  {
    id: 8,
    title: 'Black Pearl',
    image: '/img/e86ceeae-292e-442d-be2a-c974243b594a.jpg',
    category: 'Strategy',
    description: 'Build your pirate empire',
    downloadUrl: 'https://example.com/blackpearl',
    energyCost: 45
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [energy, setEnergy] = useState(() => {
    const saved = localStorage.getItem('gameEnergy');
    return saved ? parseInt(saved) : 100;
  });
  const [maxEnergy] = useState(100);
  const [lastRegenTime, setLastRegenTime] = useState(() => {
    const saved = localStorage.getItem('lastRegenTime');
    return saved ? parseInt(saved) : Date.now();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timePassed = now - lastRegenTime;
      const energyToAdd = Math.floor(timePassed / 60000);
      
      if (energyToAdd > 0 && energy < maxEnergy) {
        const newEnergy = Math.min(energy + energyToAdd, maxEnergy);
        setEnergy(newEnergy);
        setLastRegenTime(now);
        localStorage.setItem('gameEnergy', newEnergy.toString());
        localStorage.setItem('lastRegenTime', now.toString());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [energy, lastRegenTime, maxEnergy]);

  const handleDownload = (game: Game) => {
    if (energy >= game.energyCost) {
      const newEnergy = energy - game.energyCost;
      setEnergy(newEnergy);
      localStorage.setItem('gameEnergy', newEnergy.toString());
      setLastRegenTime(Date.now());
      localStorage.setItem('lastRegenTime', Date.now().toString());
      window.open(game.downloadUrl, '_blank');
    }
  };

  const categories = ['All', 'Adventure', 'Action', 'Survival', 'Arcade', 'Puzzle', 'Strategy'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Skull" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">PIRATE GAMES</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-card border-2 border-primary/30 rounded-full px-5 py-2.5 shadow-lg">
                <Icon name="Zap" size={20} className="text-primary animate-pulse" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{energy}</span>
                    <span className="text-sm text-muted-foreground">/ {maxEnergy}</span>
                  </div>
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
                      style={{ width: `${(energy / maxEnergy) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="story-link text-foreground hover:text-primary transition-colors">
                  Главная
                </a>
                <a href="#" className="story-link text-foreground hover:text-primary transition-colors">
                  О нас
                </a>
                <a href="#" className="story-link text-foreground hover:text-primary transition-colors">
                  Контакты
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Добро пожаловать на борт! 🏴‍☠️
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Отправляйся в морское приключение с лучшими пиратскими играми
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-2 border-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="hover-scale"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, index) => (
            <Card 
              key={game.id} 
              className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover-scale bg-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-sm text-foreground">{game.description}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                    {game.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span className="text-sm font-semibold">{game.energyCost} энергии</span>
                </div>
                <Button 
                  className="w-full group/btn"
                  onClick={() => handleDownload(game)}
                  disabled={energy < game.energyCost}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  <span>{energy >= game.energyCost ? 'Download' : 'Недостаточно энергии'}</span>
                  {energy >= game.energyCost && (
                    <Icon name="ExternalLink" size={14} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Игры не найдены</p>
          </div>
        )}
      </section>

      <footer className="border-t border-border bg-card mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Skull" size={24} className="text-primary" />
              <span className="font-semibold">PIRATE GAMES</span>
            </div>
            <p className="text-muted-foreground">&copy; 2025 Ваш Сайт</p>
            <div className="flex gap-4">
              <a href="#" className="hover-scale">
                <Icon name="Github" size={20} className="text-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" className="hover-scale">
                <Icon name="Twitter" size={20} className="text-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" className="hover-scale">
                <Icon name="Mail" size={20} className="text-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}