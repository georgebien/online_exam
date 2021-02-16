<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use Validator;
use App\Songs;

class SongsController extends Controller
{
    protected $songs;

    public function __construct()
    {
        $this->songs = new Songs;
    }

    public function saveSong (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'     => 'required',
            'artist'    => 'required',
            'lyrics'    => 'required',
        ]);

        if ($validator->fails()) 
        {
            return response()
                ->json([ 
                    'status' => 'false',
                    'message' => $validator->errors()->all(),
                    'data' => '',
                ]);
        } 
        else 
        {
            $result = '';
            try
            {
                $id     = $request->id;
                $data   = $request->except('_token');

                DB::beginTransaction();

                $this->songs->saveSong($id,$data);

                DB::commit();
                $result = 'Success';
            } catch (\Exception $ex) {
                DB::rollback();
                return $ex;
            }

            return response()
            ->json([
                'status' => $result,
                'message' => 'Saved Successfully',
                'data' => '',
            ]);
        }
    }

    public function loadSong ()
    {
        $data = '';
        try
        {
            DB::beginTransaction();

            $data = $this->songs->loadSong();

            DB::commit();
            $result = 'Success';
        } catch (\Exception $ex) {
            DB::rollback();
            return $ex;
        }

        return response()
        ->json([
            'status' => $result,
            'message' => 'Load Successfully',
            'data' => $data,
        ]);
    }

    public function deleteSong (Request $request)
    {
        $result = '';
        try
        {
            $id = $request->id;

            DB::beginTransaction();

            $this->songs->deleteSong($id);

            DB::commit();
            $result = 'Success';
        } catch (\Exception $ex) {
            DB::rollback();
            return $ex;
        }

        return response()
        ->json([
            'status' => $result,
            'message' => 'Deleted Successfully',
            'data' => '',
        ]);
    }
}
