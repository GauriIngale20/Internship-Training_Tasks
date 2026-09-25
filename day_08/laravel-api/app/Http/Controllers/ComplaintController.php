<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    public function index()
    {
        return response()->json(Complaint::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|integer',
            'user_id' => 'required|integer',
            'complaint_text' => 'required|string|max:255',
            'status' => 'required|string|max:50',
            'complaint_date' => 'required|date',
        ]);

        $complaint = Complaint::create($validated);

        return response()->json($complaint, 201);
    }

    public function show(Complaint $complaint)
    {
        return response()->json($complaint);
    }

    public function update(Request $request, Complaint $complaint)
    {
        $validated = $request->validate([
            'facility_id' => 'sometimes|required|integer',
            'user_id' => 'sometimes|required|integer',
            'complaint_text' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string|max:50',
            'complaint_date' => 'sometimes|required|date',
        ]);

        $complaint->update($validated);

        return response()->json($complaint);
    }

    public function destroy(Complaint $complaint)
    {
        $complaint->delete();

        return response()->json([
            'message' => 'Complaint deleted successfully'
        ]);
    }
}
