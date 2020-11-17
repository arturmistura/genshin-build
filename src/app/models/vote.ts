import { Player } from './player';

export class Vote {
  id: string;
  isUpvote: boolean;
  player: Player;
  targetId: string;
}
