<?php

namespace Database\Seeders;

use App\Models\Actualite;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ActualiteSeeder extends Seeder
{
    public function run(): void
    {
        $actualites = [
            [
                'titre_fr' => 'Lancement du Plan National de Reboisement 2025–2030',
                'titre_ar' => 'إطلاق الخطة الوطنية للتشجير 2025-2030',
                'contenu_fr' => '<p>Le Maroc lance un programme ambitieux visant la plantation de 600 000 hectares de forêts afin de lutter contre la désertification et de restaurer les écosystèmes forestiers dégradés. Ce plan s\'inscrit dans la stratégie "Forêts du Maroc 2020-2030".</p>',
                'contenu_ar' => '<p>يطلق المغرب برنامجا طموحا يهدف إلى زراعة 600 ألف هكتار من الغابات للحد من التصحر.</p>',
                'extrait_fr' => 'Le Maroc lance un programme ambitieux visant la plantation...',
                'extrait_ar' => 'يطلق المغرب برنامجا طموحا يهدف إلى زراعة...',
                'categorie' => 'Communiqués',
                'date_publication' => Carbon::now()->subDays(2),
            ],
            [
                'titre_fr' => 'COP30 : La délégation marocaine présente ses engagements climatiques',
                'titre_ar' => 'الوفد المغربي يقدم التزاماته المناخية',
                'contenu_fr' => '<p>Dans le cadre de la COP30 au Brésil, le Maroc présente une contribution renforcée avec un objectif de réduction des émissions GES de 45,5 % d\'ici 2030.</p>',
                'contenu_ar' => '<p>في إطار مؤتمر الأطراف، يقدم المغرب مساهمة معززة بهدف الحد من الانبعاثات.</p>',
                'extrait_fr' => 'Dans le cadre de la COP30 au Brésil, le Maroc présente une contribution...',
                'extrait_ar' => 'في إطار مؤتمر الأطراف، يقدم المغرب مساهمة معززة...',
                'categorie' => 'Événements',
                'date_publication' => Carbon::now()->subDays(5),
            ],
            [
                'titre_fr' => 'Rapport : État des forêts du Rif en 2024',
                'titre_ar' => 'تقرير: حالة غابات الريف في 2024',
                'contenu_fr' => '<p>Le rapport annuel 2024 sur l\'état des forêts du Rif révèle une régénération notable dans les zones protégées, accompagnée d\'enjeux persistants liés aux incendies.</p>',
                'contenu_ar' => '<p>يكشف التقرير السنوي عن تجدد ملحوظ في المناطق المحمية.</p>',
                'extrait_fr' => 'Le rapport annuel 2024 sur l\'état des forêts du Rif révèle une régénération...',
                'extrait_ar' => 'يكشف التقرير السنوي عن تجدد ملحوظ في المناطق المحمية.',
                'categorie' => 'News',
                'date_publication' => Carbon::now()->subDays(10),
            ],
            [
                'titre_fr' => 'Inauguration du nouveau parc éolien de Dakhla',
                'titre_ar' => 'تدشين مزرعة رياح جديدة في الداخلة',
                'contenu_fr' => '<p>Nouvelle étape franchie dans la transition énergétique avec l\'inauguration de la nouvelle station éolienne.</p>',
                'contenu_ar' => '<p>خطوة جديدة في انتقال الطاقة مع تدشين محطة طاقة الرياح الجديدة.</p>',
                'extrait_fr' => 'Nouvelle étape franchie dans la transition énergétique...',
                'extrait_ar' => 'خطوة جديدة في انتقال الطاقة...',
                'categorie' => 'News',
                'date_publication' => Carbon::now()->subDays(15),
            ],
            [
                'titre_fr' => 'Stratégie Nationale de l\'Eau 2025 : Bilan d\'étape',
                'titre_ar' => 'الاستراتيجية الوطنية للماء: تقييم مرحلي',
                'contenu_fr' => '<p>Face au stress hydrique, le Ministère passe en revue l\'avancement des usines de dessalement d\'eau de mer.</p>',
                'contenu_ar' => '<p>في مواجهة الإجهاد المائي، تراجع الوزارة تقدم محطات تحلية المياه.</p>',
                'extrait_fr' => 'Face au stress hydrique, le Ministère passe en revue...',
                'extrait_ar' => 'في مواجهة الإجهاد المائي...',
                'categorie' => 'Événements',
                'date_publication' => Carbon::now()->subDays(20),
            ],
            [
                'titre_fr' => 'Création de 3 nouvelles zones protégées',
                'titre_ar' => 'إنشاء 3 مناطق محمية جديدة',
                'contenu_fr' => '<p>Le décret officiel publié ce vendredi annonce la classification de trois zones humides comme aires naturelles protégées.</p>',
                'contenu_ar' => '<p>يعلن المرسوم الرسمي نشر اليوم عن تصنيف ثلاث مناطق رطبة.</p>',
                'extrait_fr' => 'Le décret officiel publié ce vendredi annonce la classification...',
                'extrait_ar' => 'يعلن المرسوم الرسمي نشر اليوم...',
                'categorie' => 'Communiqués',
                'date_publication' => Carbon::now()->subDays(25),
            ]
        ];

        foreach ($actualites as $actu) {
            $actu['slug'] = Str::slug($actu['titre_fr']);
            $actu['is_published'] = true;
            Actualite::create($actu);
        }
    }
}
