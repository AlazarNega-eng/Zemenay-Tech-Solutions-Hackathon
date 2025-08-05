<?php

namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BlogStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Posts', Post::count())
                ->description('All blog posts')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('primary'),

            Stat::make('Recent Posts', Post::where('created_at', '>=', now()->subDays(7))->count())
                ->description('Posts from last 7 days')
                ->descriptionIcon('heroicon-m-clock')
                ->color('success'),

            Stat::make('This Month', Post::where('created_at', '>=', now()->startOfMonth())->count())
                ->description('Posts created this month')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('warning'),
        ];
    }
}
