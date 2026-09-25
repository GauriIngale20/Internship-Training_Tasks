<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    public function index()
    {
        return response()->json(Inspection::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|integer',
            'user_id' => 'required|integer',
            'inspection_date' => 'required|date',
            'cleanliness_score' => 'nullable|numeric',
            'odor_score' => 'nullable|numeric',
            'waste_level' => 'nullable|numeric',
            'remarks' => 'nullable|string|max:255',
        ]);

        $inspection = Inspection::create($validated);

        return response()->json($inspection, 201);
    }

    public function show(Inspection $inspection)
    {
        return response()->json($inspection);
    }

    public function update(Request $request, Inspection $inspection)
    {
        $validated = $request->validate([
            'facility_id' => 'sometimes|required|integer',
            'user_id' => 'sometimes|required|integer',
            'inspection_date' => 'sometimes|required|date',
            'cleanliness_score' => 'nullable|numeric',
            'odor_score' => 'nullable|numeric',
            'waste_level' => 'nullable|numeric',
            'remarks' => 'nullable|string|max:255',
        ]);

        $inspection->update($validated);

        return response()->json($inspection);
    }

    public function destroy(Inspection $inspection)
    {
        $inspection->delete();

        return response()->json([
            'message' => 'Inspection deleted successfully'
        ]);
    }
}
