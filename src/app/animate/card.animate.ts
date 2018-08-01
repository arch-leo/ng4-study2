import { trigger, state, style, transition, animate } from '@angular/animations';
export const cardAnimate = trigger(
    'card', [
        state('out', style({ transform: 'scale(1)', boxShadow: 'none' })),
        state('in', style({ transform: 'scale(1.1)', boxShadow: '3px 3px 5px 6px #ccc' })),
        transition('out=>in', animate('0.2s ease-in')),
        transition('in=>out', animate('0.2s ease-out')),
    ]
);
