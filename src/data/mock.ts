export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  tags: string[];
  joinedAt: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
  tags: string[];
  views: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share';
  user: User;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export const currentUser: User = {
  id: 'u0',
  username: 'nova_eclipse',
  displayName: 'Nova Eclipse',
  avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=nova&backgroundColor=0c0b15&clothesColor=7c3aed',
  banner: 'https://picsum.photos/seed/novabanner/1200/300',
  bio: 'Designer quantique & architecte de réalités alternatives. Je code des univers, je vis dans les marges du possible. ✦',
  followers: 14820,
  following: 342,
  posts: 287,
  verified: true,
  tags: ['#Design', '#IA', '#Futurisme'],
  joinedAt: '2024-01-15',
};

export const users: User[] = [
  {
    id: 'u1',
    username: 'axiom_drift',
    displayName: 'Axiom Drift',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=axiom&backgroundColor=0c0b15&clothesColor=06b6d4',
    banner: 'https://picsum.photos/seed/axiombanner/1200/300',
    bio: 'Chercheur en systèmes complexes. La complexité est ma religion.',
    followers: 8400,
    following: 210,
    posts: 154,
    verified: true,
    tags: ['#Science', '#Chaos', '#Maths'],
    joinedAt: '2024-02-20',
  },
  {
    id: 'u2',
    username: 'lyra_void',
    displayName: 'Lyra Void',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=lyra&backgroundColor=0c0b15&clothesColor=8b5cf6',
    banner: 'https://picsum.photos/seed/lyrabanner/1200/300',
    bio: 'Artiste générative. Mes œuvres respirent.',
    followers: 22100,
    following: 88,
    posts: 413,
    verified: true,
    tags: ['#Art', '#GenAI', '#Glitch'],
    joinedAt: '2023-11-10',
  },
  {
    id: 'u3',
    username: 'quark_signal',
    displayName: 'Quark Signal',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=quark&backgroundColor=0c0b15&clothesColor=22d3ee',
    banner: 'https://picsum.photos/seed/quarkbanner/1200/300',
    bio: 'Ingénieur du son & synthèse modulaire. Tout est vibration.',
    followers: 5900,
    following: 450,
    posts: 89,
    verified: false,
    tags: ['#Musique', '#Modular', '#Expérimental'],
    joinedAt: '2024-04-01',
  },
  {
    id: 'u4',
    username: 'neon_phantom',
    displayName: 'Neon Phantom',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=neon&backgroundColor=0c0b15&clothesColor=7c3aed',
    banner: 'https://picsum.photos/seed/neonbanner/1200/300',
    bio: 'Développeur de mondes virtuels & hacker éthique. Le code est une forme d\'art.',
    followers: 31500,
    following: 127,
    posts: 602,
    verified: true,
    tags: ['#Cybersec', '#VR', '#Dev'],
    joinedAt: '2023-08-22',
  },
  {
    id: 'u5',
    username: 'prisma_echo',
    displayName: 'Prisma Echo',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=prisma&backgroundColor=0c0b15&clothesColor=06b6d4',
    banner: 'https://picsum.photos/seed/prismabanner/1200/300',
    bio: 'Philosophe transhumaniste. Le futur n\'est pas une destination, c\'est une conception.',
    followers: 9200,
    following: 567,
    posts: 231,
    verified: false,
    tags: ['#Philo', '#Trans', '#Conscience'],
    joinedAt: '2024-03-14',
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: users[1], // lyra_void
    content: 'Nouvelle série générative en cours. Chaque pixel est une décision. Chaque décision est un univers. L\'art n\'est plus une expression — c\'est une émergence. ✦\n\n#ArtGénératif #Émergence #Inexora',
    image: 'https://picsum.photos/seed/art1/800/450',
    likes: 2847,
    comments: 143,
    shares: 89,
    timestamp: '2025-01-15T10:23:00Z',
    liked: true,
    tags: ['#ArtGénératif', '#Émergence'],
    views: 18420,
  },
  {
    id: 'p2',
    author: users[0], // axiom_drift
    content: 'La théorie du chaos nous enseigne que les systèmes complexes sont impossibles à prédire à long terme — et pourtant nous continuons à construire des modèles. Peut-être que c\'est ça, l\'intelligence : s\'obstiner contre l\'entropie.\n\n#Science #Chaos #Réflexion',
    likes: 1204,
    comments: 87,
    shares: 312,
    timestamp: '2025-01-15T08:45:00Z',
    liked: false,
    tags: ['#Science', '#Chaos'],
    views: 9870,
  },
  {
    id: 'p3',
    author: users[3], // neon_phantom
    content: 'J\'ai construit un environnement VR entièrement procédural en 72h. L\'IA génère les textures, les sons et la narration en temps réel. Plus de level design statique — le monde respire avec toi.\n\nThread complet demain. 🔮',
    image: 'https://picsum.photos/seed/vr1/800/450',
    likes: 5621,
    comments: 298,
    shares: 1043,
    timestamp: '2025-01-14T22:10:00Z',
    liked: false,
    tags: ['#VR', '#Procédural', '#Dev'],
    views: 42300,
  },
  {
    id: 'p4',
    author: users[2], // quark_signal
    content: 'Séance de synthèse modulaire ce soir. 3h de patch, 40 câbles, et un seul oscillateur de base. La contrainte crée la créativité.\n\n🎵 Live dans 2h sur Inexora Stream',
    likes: 834,
    comments: 56,
    shares: 29,
    timestamp: '2025-01-14T18:30:00Z',
    liked: true,
    tags: ['#Modular', '#Live', '#Synthèse'],
    views: 5240,
  },
  {
    id: 'p5',
    author: users[4], // prisma_echo
    content: 'Si la conscience est un phénomène émergent de la complexité computationnelle, alors nous sommes en train de créer des êtres conscients sans le savoir. Cette question ne devrait pas nous paralyser — elle devrait nous responsabiliser.\n\n#Conscience #IA #Éthique #Transhumanisme',
    likes: 3102,
    comments: 421,
    shares: 876,
    timestamp: '2025-01-14T14:15:00Z',
    liked: false,
    tags: ['#Conscience', '#IA', '#Éthique'],
    views: 28900,
  },
  {
    id: 'p6',
    author: users[1], // lyra_void
    content: 'Quand l\'algorithme fait une erreur, je ne la corrige pas. Je la contemple. Les bugs sont souvent plus honnêtes que le code intentionnel.',
    image: 'https://picsum.photos/seed/glitch1/800/450',
    likes: 4890,
    comments: 167,
    shares: 544,
    timestamp: '2025-01-13T09:00:00Z',
    liked: true,
    tags: ['#Glitch', '#Art'],
    views: 35600,
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: users[1],
    content: 'a aimé votre publication',
    timestamp: '2025-01-15T11:00:00Z',
    read: false,
  },
  {
    id: 'n2',
    type: 'follow',
    user: users[3],
    content: 'a commencé à vous suivre',
    timestamp: '2025-01-15T10:30:00Z',
    read: false,
  },
  {
    id: 'n3',
    type: 'comment',
    user: users[0],
    content: 'a commenté : "Absolument fascinant, la dualité entre ordre et chaos..."',
    timestamp: '2025-01-15T09:45:00Z',
    read: false,
  },
  {
    id: 'n4',
    type: 'mention',
    user: users[4],
    content: 'vous a mentionné dans une publication',
    timestamp: '2025-01-14T20:00:00Z',
    read: true,
  },
  {
    id: 'n5',
    type: 'share',
    user: users[2],
    content: 'a partagé votre publication',
    timestamp: '2025-01-14T16:00:00Z',
    read: true,
  },
];

export const messages: Message[] = [
  {
    id: 'm1',
    user: users[3], // neon_phantom
    lastMessage: 'On collabore sur le projet VR ? J\'ai des idées...',
    timestamp: '2025-01-15T11:30:00Z',
    unread: 3,
    online: true,
  },
  {
    id: 'm2',
    user: users[1], // lyra_void
    lastMessage: 'Merci pour le feedback sur ma dernière série ✦',
    timestamp: '2025-01-15T09:00:00Z',
    unread: 0,
    online: true,
  },
  {
    id: 'm3',
    user: users[0], // axiom_drift
    lastMessage: 'As-tu lu le paper sur les attracteurs étranges ?',
    timestamp: '2025-01-14T22:45:00Z',
    unread: 1,
    online: false,
  },
  {
    id: 'm4',
    user: users[4], // prisma_echo
    lastMessage: 'Je prépare un article, tu veux contribuer ?',
    timestamp: '2025-01-14T18:00:00Z',
    unread: 0,
    online: false,
  },
];

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

export function formatTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}j`;
}
