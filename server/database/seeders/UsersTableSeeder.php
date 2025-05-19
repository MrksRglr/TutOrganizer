<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tutor1 = new User();
        $tutor1->name = 'tutor1';
        $tutor1->email = 'tutor1@gmail.com';
        $tutor1->password = bcrypt('secret');
        $tutor1->education = 'FH OÖ, Hagenberg, KWM (BSc), KWM (MA)';
        $tutor1->skills = 'JavaScript, PHP, Laravel, Vue.js, React.js, Node.js, HTML, CSS, SQL,';
        $tutor1->role = 'tutor';
        $tutor1->save();

        $tutor2 = new User();
        $tutor2->name = 'tutor2';
        $tutor2->email = 'tutor2@gmail.com';
        $tutor2->password = bcrypt('secret');
        $tutor2->education = 'JKU Linz, Psychologie (BA), Psychologie (MA)';
        $tutor2->skills = 'Lernpsychologie, Organisationsentwicklung, Personalentwicklung';
        $tutor2->role = 'tutor';
        $tutor2->save();

        $student1 = new User();
        $student1->name = 'student1';
        $student1->email = 'student1@gmail.com';
        $student1->password = bcrypt('secret');
        $student1->role = 'student';
        $student1->save();

        $student2 = new User();
        $student2->name = 'student2';
        $student2->email = 'student2@gmail.com';
        $student2->password = bcrypt('secret');
        $student2->role = 'student';
        $student2->save();

        $student3 = new User();
        $student3->name = 'student3';
        $student3->email = 'student3@gmail.com';
        $student3->password = bcrypt('secret');
        $student3->role = 'student';
        $student3->save();
    }
}
