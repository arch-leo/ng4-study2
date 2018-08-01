import { trigger, state, style, transition, animate } from '@angular/animations';
export const itemAnimate = trigger(
    'item', [
        state('out', style({ borderLeftWidth: '3px' })),
        state('in', style({ borderLeftWidth: '6px' })),
        transition('out=>in', animate('0.1s ease-in')),
        transition('in=>out', animate('0.1s ease-out')),
    ]
);

