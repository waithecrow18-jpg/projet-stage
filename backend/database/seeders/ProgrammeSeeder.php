<?php

namespace Database\Seeders;

use App\Models\Programme;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProgrammeSeeder extends Seeder
{
    public function run(): void
    {
        $programmes = [
            [
                'nom_fr' => 'Stratégie Nationale de Développement Durable (SNDD)',
                'nom_ar' => 'الاستراتيجية الوطنية للتنمية المستدامة',
                'description_fr' => 'Cadre intégré pour le développement durable à horizon 2030, articulant les dimensions économique, sociale et environnementale.',
                'description_ar' => 'إطار متكامل للتنمية المستدامة في أفق 2030، يربط الأبعاد الاقتصادية والاجتماعية والبيئية.',
                'icone' => 'Leaf',
                'couleur' => '#0F6E56',
                'annee_lancement' => 2017,
                'statut' => 'Actif',
            ],
            [
                'nom_fr' => 'Plan National de Lutte contre le Réchauffement Climatique',
                'nom_ar' => 'المخطط الوطني لمكافحة الاحتباس الحراري',
                'description_fr' => 'Réduction des émissions GES de 45,5% d\'ici 2030 et adaptation aux impacts climatiques.',
                'description_ar' => 'تخفيض انبعاثات الغازات الدفيئة بنسبة 45.5٪ بحلول 2030 والتكيف مع التأثيرات المناخية.',
                'icone' => 'Wind',
                'couleur' => '#185FA5',
                'annee_lancement' => 2021,
                'statut' => 'En cours',
            ],
            [
                'nom_fr' => 'Conservation de la Biodiversité',
                'nom_ar' => 'المحافظة على التنوع البيولوجي',
                'description_fr' => 'Protection des écosystèmes terrestres et marins du Maroc et préservation des espèces endémiques.',
                'description_ar' => 'حماية النظم الإيكولوجية البرية والبحرية للمغرب والحفاظ على الأنواع المتوطنة.',
                'icone' => 'TreePine',
                'couleur' => '#1D9E75',
                'annee_lancement' => 2016,
                'statut' => 'Actif',
            ],
            [
                'nom_fr' => 'Programme National de Gestion des Déchets (PNDM)',
                'nom_ar' => 'البرنامج الوطني لتدبير النفايات',
                'description_fr' => 'Modernisation de la gestion des déchets ménagers à l\'échelle nationale et économie circulaire.',
                'description_ar' => 'تحديث إدارة النفايات المنزلية على المستوى الوطني والاقتصاد الدائري.',
                'icone' => 'Recycle',
                'couleur' => '#BA7517',
                'annee_lancement' => 2008,
                'statut' => 'En cours',
            ],
        ];

        foreach ($programmes as $prog) {
            $prog['slug'] = Str::slug($prog['nom_fr']);
            Programme::create($prog);
        }
    }
}
