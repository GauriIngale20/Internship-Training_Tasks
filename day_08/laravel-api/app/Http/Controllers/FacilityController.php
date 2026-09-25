<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function index()
    {
        return response()->json(Facility::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'nullable|string|max:100',
            'cleanliness_score' => 'nullable|numeric',
            'odor_score' => 'nullable|numeric',
            'waste_level' => 'nullable|numeric',
            'water_availability' => 'nullable|boolean',
        ]);

        $facility = Facility::create($validated);

        return response()->json($facility, 201);
    }

    public function show(Facility $facility)
    {
        return response()->json($facility);
    }

    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'location' => 'nullable|string|max:100',
            'cleanliness_score' => 'nullable|numeric',
            'odor_score' => 'nullable|numeric',
            'waste_level' => 'nullable|numeric',
            'water_availability' => 'nullable|boolean',
        ]);

        $facility->update($validated);

        return response()->json($facility);
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();

        return response()->json([
            'message' => 'Facility deleted successfully'
        ]);
    }
}
