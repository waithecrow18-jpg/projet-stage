<?php

namespace Database\Seeders;

use App\Models\Statistique;
use Illuminate\Database\Seeder;

class StatistiqueSeeder extends Seeder
{
    public function run(): void
    {
        $stats = [
            [
                'cle' => 'aires_protegees',
                'valeur' => '154',
                'unite' => null,
                'description_fr' => 'Aires Naturelles Protégées (SIBE)',
                'description_ar' => 'المناطق الطبيعية المحمية',
            ],
            [
                'cle' => 'cotes_km',
                'valeur' => '3500',
                'unite' => 'km',
                'description_fr' => 'Kilomètres de côtes maritimes',
                'description_ar' => 'كيلومترات من السواحل البحرية',
            ],
            [
                'cle' => 'enr_objectif',
                'valeur' => '52',
                'unite' => '%',
                'description_fr' => 'Objectif ENR mix électrique 2030',
                'description_ar' => 'هدف الطاقات المتجددة 2030',
            ],
            [
                'cle' => 'sites_ramsar',
                'valeur' => '24',
                'unite' => null,
                'description_fr' => 'Sites inscrits convention Ramsar',
                'description_ar' => 'مواقع رامسار',
            ],
            [
                'cle' => 'superficie_forets',
                'valeur' => '9.6',
                'unite' => 'M ha',
                'description_fr' => 'Millions d\'hectares de forêts',
                'description_ar' => 'מلايين الهكتارات من الغابات',
            ],
            [
                'cle' => 'parcs_nationaux',
                'valeur' => '11',
                'unite' => null,
                'description_fr' => 'Parcs nationaux créés',
                'description_ar' => 'متنزهات وطنية',
            ],
        ];

        foreach ($stats as $stat) {
            Statistique::create($stat);
        }
    }
}
