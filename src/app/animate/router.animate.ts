import { trigger, state, style, transition, animate, group } from '@angular/animations';
export const slideToRight = trigger(
    'router', [
        state('void', style({ position: 'absolute', width: '100%', height: '100%' })),
        state('*', style({ position: 'absolute', width: '100%', height: '100%' })),
        transition(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            group([
                animate('.5s ease-in-out', style({ transform: 'translateX(0)' })),
                animate('.3s ease-in', style({ opacity: 1 }))
            ])
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0)' }),
            group([
                animate('.5s ease-in-out', style({ transform: 'translateX(100%)' })),
                animate('.3s ease-in', style({ opacity: 0 }))
            ])
        ]),
    ]
);

