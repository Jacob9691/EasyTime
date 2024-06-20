<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Hent den aktuelle bruger fra anmodningen
        $user = $request->user();

        // Hent alle begivenheder tilhørende den aktuelle bruger
        $events = Event::query()->where('user_id', $user->id)->get();

        // Returner begivenhederne som JSON respons
        return response()->json($events);
    }

    public function store(StoreEventRequest $request): JsonResponse
    {
        // Valider indkommende data baseret på StoreEventRequest regler
        $validatedData = $request->validated();

        // Konverter start- og slutdato til Carbon objekter
        $validatedData['start'] = Carbon::parse($validatedData['start']);
        $validatedData['end'] = Carbon::parse($validatedData['end']);

        // Opret en ny begivenhed baseret på de validerede data
        $event = Event::query()->create($validatedData);

        // Returner den oprettede begivenhed som JSON respons med statuskode 201 (Created)
        return response()->json($event, 201);
    }

    public function destroy(Request $request, Event $event): JsonResponse
    {
        // Slet den angivne begivenhed
        $event->delete();

        // Returner en tom respons med statuskode 204 (No Content)
        return response()->json(null, 204);
    }
}
