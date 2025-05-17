<?php

namespace Database\Seeders;

use App\Models\ArrivalRule;
use App\Models\Supplier;
use App\Models\Transaction;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        $suppliers = [
            [
                'supplier_code' => 'L0284',
                'supplier_name' => 'PT.TIGER SASH INDONESIA',
                'isRit' => 1,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0284',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('06:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                    [
                        'supplier_code' => 'L0284',
                        'rit' => 2,
                        'jam_kedatangan' => Carbon::parse('15:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0207',
                'supplier_name' => 'PT.HASHIMOTO',
                'isRit' => 1,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0207',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('06:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                    [
                        'supplier_code' => 'L0207',
                        'rit' => 2,
                        'jam_kedatangan' => Carbon::parse('14:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0173',
                'supplier_name' => 'PT.HERROS',
                'isRit' => 1,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0173',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('06:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                    [
                        'supplier_code' => 'L0173',
                        'rit' => 2,
                        'jam_kedatangan' => Carbon::parse('14:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0234',
                'supplier_name' => 'PT.ASABA METAL INDUSTRI',
                'isRit' => 1,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0234',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('09:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                    [
                        'supplier_code' => 'L0234',
                        'rit' => 2,
                        'jam_kedatangan' => Carbon::parse('15:30')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0177',
                'supplier_name' => 'PT.MARUICHI',
                'isRit' => 1,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0177',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('07:45')->format('H:i'),
                        'durasi_bongkar' => 90
                    ],
                    [
                        'supplier_code' => 'L0177',
                        'rit' => 2,
                        'jam_kedatangan' => Carbon::parse('15:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                ]
            ],
            [
                'supplier_code' => 'L9999',
                'supplier_name' => 'PT.IWATANI',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L9999',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('07:30')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L1416',
                'supplier_name' => 'PT.MKCJ',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L1416',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('09:00')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0134',
                'supplier_name' => 'PT.MORY',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0134',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('09:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0278',
                'supplier_name' => 'PT.CATALER INDONESIA',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0278',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('09:30')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0147',
                'supplier_name' => 'PT.NITIGURA',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0147',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('10:00')->format('H:i'),
                        'durasi_bongkar' => 60
                    ],
                ]
            ],
            [
                'supplier_code' => 'L3333',
                'supplier_name' => 'PT.METALINDO',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L3333',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('10:30')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L1463',
                'supplier_name' => 'PT.BETSO TECH INDONESIA',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L1463',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('11:15')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0232',
                'supplier_name' => 'PT.INDOPRIMA GEMILANG',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0232',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('11:15')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0009',
                'supplier_name' => 'PT.TOSAMA',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0009',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('13:00')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            [
                'supplier_code' => 'L0005',
                'supplier_name' => 'PT.SEC INDONESIA',
                'isRit' => 0,
                'arrival_rules' => [
                    [
                        'supplier_code' => 'L0005',
                        'rit' => 1,
                        'jam_kedatangan' => Carbon::parse('13:00')->format('H:i'),
                        'durasi_bongkar' => 30
                    ],
                ]
            ],
            // [
            //     'supplier_code' => 'L0187',
            //     'supplier_name' => 'PT.ITOCHU',
            //     'isRit' => 0
            // ],
            // [
            //     'supplier_code' => 'L0249',
            //     'supplier_name' => 'PT.SADEREX',
            //     'isRit' => 0
            // ],
            // [
            //     'supplier_code' => 'L0224',
            //     'supplier_name' => 'PT.3M',
            //     'isRit' => 0
            // ],
            // [
            //     'supplier_code' => 'L1454',
            //     'supplier_name' => 'PT.SINTESA',
            //     'isRit' => 0
            // ],



            // 'L0284' => 'PT.TIGER SASH INDONESIA',
            // 'L0224' => 'PT.3M',
            // 'L0234' => 'PT.ASABA METAL INDUSTRI',
            // 'L1463' => 'PT.BETSO TECH INDONESIA',
            // 'L0278' => 'PT.CATALER INDONESIA',
            // 'L0207' => 'PT.HASHIMOTO',
            // 'L0173' => 'PT.HERROS',
            // 'L0232' => 'PT.INDOPRIMA GEMILANG',
            // 'L0187' => 'PT.ITOCHU',
            // 'L0177' => 'PT.MARUICHI',
            // 'L1416' => 'PT.MKCJ',
            // 'L0134' => 'PT.MORY',
            // 'L0147' => 'PT.NITIGURA',
            // 'L0249' => 'PT.SADEREX',
            // 'L0005' => 'PT.SEC INDONESIA',
            // 'L1454' => 'PT.SINTESA',
            // 'L0009' => 'PT.TOSAMA',
            // Tambahkan pola lain di sini jika perlu
        ]; // ]);
        // foreach $suppliers as $supplier {

        // };
        foreach ($suppliers as $supplier) {
            Supplier::create([
                'supplier_code' => $supplier['supplier_code'],
                'supplier_name' => $supplier['supplier_name'],
                'isRit' => $supplier['isRit'],
            ]);
            foreach ($supplier['arrival_rules'] as $arrivalRule) {
                ArrivalRule::create($arrivalRule);
                
                // Create 5 transactions for each arrival rule
                for ($i = 0; $i < 50; $i++) {
                    $scheduledTime = Carbon::parse($arrivalRule['jam_kedatangan'])->subDays($i);
                    // Random arrival time between -20 and +20 minutes
                    $arrivalTime = $scheduledTime->copy()->addMinutes(rand(-20, 20));
                    
                    // Calculate bongkar/muat duration within ±10 minutes of specified duration
                    $duration = $arrivalRule['durasi_bongkar'];
                    $actualDuration = rand($duration - 10, $duration + 10);
                    // $addDuration = rand(25);
                    
                    // Calculate end time based on actual duration
                    $endTime = $arrivalTime->copy()->addMinutes($actualDuration);
                    
                    Transaction::create([
                        'supplier_code' => $arrivalRule['supplier_code'],
                        'rit' => $arrivalRule['rit'],
                        'supplier_in' => $arrivalTime,
                        'supplier_startBongkarMuat' => $arrivalTime,
                        'supplier_selesaiBongkarMuat' => $endTime,
                        'supplier_out' => $endTime->copy()->addMinutes(rand(0,25)),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
            // unset($supplier->arrival_rules);
        }

        // Supplier::factory()
        // ->count(10)
        // ->has(Transaction::factory()->count(10))
        // ->has(ArrivalRule::factory()->count(2))
        // ->create();
        // Transaction::factory(10)->create();
    }
}
